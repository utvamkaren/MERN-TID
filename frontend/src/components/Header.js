import { FaSignOutAlt} from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from '../features/auth/authSlice';



const Header = () => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    
    const{user}=useSelector(state=> state.auth)
    const logoutFn =()=>{
        dispatch(logout())
        dispatch(reset())
        navigate("/-")
    }
    return (
        <header className="header">
            <div className="logo">
            <img src="/images/logo.png" alt="Logo" className="logo-img" />

                <Link to="/">Louis Vuitton</Link>
            </div>

            <ul>
                {user ?(

<li>

<button className="btn-logout" onClick={logoutFn}>
  <FaSignOutAlt /> Logout
</button>
</li>

                ):(
                <>
                
                </>
                )}
            </ul>
        </header>
    );
}

export default Header;

