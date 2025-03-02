import { Link } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const NavBar =()=> {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
    return (
        <nav>
        {user ? (
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/ideas'>IDEAS</Link></li>
            <li><Link to ='/ideas/new'>NEW IDEA</Link></li>
            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          </ul>
        ) : (
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/sign-in'>SIGN IN</Link></li>
            <li><Link to='/sign-up'>SIGN UP</Link></li>
          </ul>
        )}
      </nav>  
    )
}


export default NavBar;