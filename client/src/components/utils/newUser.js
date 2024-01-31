import { useCallback, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export const CreateNewAccountForm = ({handleNewUserSubmit}) => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')



    // const newUser = {
    //     first_name:firstName,
    //     last_name:lastName,
    //     username:userName,
    //     password:password
    // }
    const newUser = {
       "first_name": firstName,
        "last_name": lastName,
        "username": userName,
        "password": password
    }
    const clearForm = () => (
        setFirstName(''),
        setLastName(''),
        setUserName(''),
        setPassword('')
    );
    const validateForm = () => {
        if (firstName.length < 2) {

            alert(
            'Invalid Input, chose a longer name',
            )
            return}
        if (lastName.length < 2) {
            alert(
            'Invalid Input, chose a longer last name',
            )
            return}
            if (userName.length < 2) {

                alert(
                'Invalid Input, chose a longer username',
                )
                return}
        if (password.length < 3) {
            alert(
            'Invalid Input, password too short',
            )
            return 
        } else {
            handleNewUserSubmit(newUser)
            clearForm()
        }

    }



return (
    <>
    <div className="new-item-card col-lg-8">
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
        <Form.Control
        placeholder="First Name"
        aria-label="First Name"
        aria-describedby="basic-addon1"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1 item-description">Last Name </InputGroup.Text>
        <Form.Control
       placeholder="Last Name"
       aria-label="Last Name"
       aria-describedby="basic-addon1"
       value={lastName}
       onChange={(e) => setLastName(e.target.value)}
       />
        <p></p>
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1 item-description">Username </InputGroup.Text>
        <Form.Control
       placeholder="Username"
       aria-label="Username"
       aria-describedby="basic-addon1"
       value={userName}
       onChange={(e) => setUserName(e.target.value)}
       />
        <p></p>
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1 item-description">Pssword</InputGroup.Text>
        <Form.Control
        type="password"
       placeholder="somethingsupercomplexthatnobodywouldguess"
       aria-label="Password"
       aria-describedby="basic-addon1"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       />
        <p></p>
    </InputGroup>
    
   
    <Button className="" onClick={() => { validateForm() }}>Submit</Button>
    <button className="btn btn-danger col col-sm-2 m-1" onClick={clearForm}>cancel</button>
</div>
</>
)}

const CreateAccount = () => {

        const handleNewUserSubmit = useCallback((newUser) => {
            console.log(newUser.first_name)
            if(newUser){
                fetch(`http://localhost:4400/users`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                    })
                    .then(res => res.json())
            
                    .then(addedUserResponse => 
                        {alert(`Congrats!!!!  ${addedUserResponse.first_name}has been added.`); console.log('new User added')})
    
                } else {
                    console.log("failed to create new user")
                }
            }, []);
      
        return (
            <>
           <CreateNewAccountForm handleNewUserSubmit={handleNewUserSubmit}/>
            </>
        )
    }
export default CreateAccount;