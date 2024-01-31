
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import { LogOut, Login } from './login'
import CreateAccount from './newUser';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';



const Header = () => {
    const navigate = useNavigate();
    const { userData} = useContext(UserContext);
        
        const user = userData;
        const shouldShowNew = userData && Object.keys(userData).length < 3;
    return (
      <header className="header">
        <img
          src={logo}
          className="pointer"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <nav>
        {shouldShowNew 
                    ? <><Button className='btn-sm small' variant='info' onClick={() => navigate("/create-account")}>
                    Create Account
                </Button></> 
                    : <>
                        
                    </>}

          <Login />
          <LogOut />
        </nav>
      </header>
    );
  };
  
  export default Header;