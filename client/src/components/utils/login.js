import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App'
import { Button } from "react-bootstrap";
// import useAuth from './useAuth'



export const LogOut = () => {
    const navigate = useNavigate();

    const { userData, updateUserData } = useContext(UserContext);
    const userName = userData.username

    const handleLogOut = () => {
         updateUserData({}) 
         navigate("/");
         localStorage.removeItem('added-items');
         alert("logged out");
        }
    const shouldShowLogout = userData && Object.keys(userData).length > 3;

    return (
        <>
            {shouldShowLogout && <>
                <button className="logout" onClick={() => navigate(`/dashboard/${userName}`)}>Dashboard</button><button className="logout" onClick={handleLogOut}>LOG OUT</button>
            </>}
        </>
    )
}


export const Login = () => {
    const navigate = useNavigate();
    const { userData, updateUserData } = useContext(UserContext);
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const shouldShowLogin = userData && Object.keys(userData).length < 3;


    const handleLogin = async () => {
        
        function AddToLocalStorage(data) {
            if (typeof data != "string") {data = JSON.stringify(data);}
            return data;
        }

        await fetch('http://localhost:4400/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ username: userName, password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log("handle Login User Data",data)
                if (data.username){  
                    // console.log("handle Login", data)
                    updateUserData(data);
                const token = {"key":"key"}
                localStorage.setItem('added-items', AddToLocalStorage(token));
                    navigate(`/dashboard/${data.username}`);
                }
                else {alert("YOU HAVE FAILED TO LOG IN")
                }
            });
// console.log(" handle login userdata from state context",userData)
    };

    // console.log("login userdata from state context",userData)
    
    return (
        <>
        {(shouldShowLogin) && <div className="login">
            <input 
                type="text" 
                placeholder="Username"
                id="username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input 
                type="password" 
                placeholder="Password" 
                aria-label="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button
                type="submit" 
                id="submit-button"
                onClick={handleLogin} >
                    sign-in
            </Button>
                
               
           
        </div>}
        </>
    );
}

  
function LoginWithContext() {

    
    return (
        <UserContext.Consumer>
        {({ updateUserData }) => (
            <>
            <Login updateUserData={updateUserData} />
            <LogOut updateUserData={updateUserData} />
            </>
        )}
        </UserContext.Consumer>
    );
    }
          




export default LoginWithContext;