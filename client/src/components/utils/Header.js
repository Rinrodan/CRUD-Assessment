
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import { LogOut, Login } from './login'



const Header = () => {
    const navigate = useNavigate();
    return(
        <div className="header">
            <img src={logo} className='pointer' alt="logo" onClick={() => navigate("/")}/>
            <nav>
                
                <div><Login /></div>
                <div><LogOut /></div>
            </nav>

        </div>
    )
}
export default Header