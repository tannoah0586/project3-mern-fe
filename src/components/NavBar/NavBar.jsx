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
      <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
      <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ideas/new">+ Share a new idea</Link></li>
        <li><Link to="/ideas">All ideas</Link></li>
        <li><Link to="/">Your Ideas</Link></li>

      </ul>
    </div>
        <a className="btn btn-ghost text-2xl">Idea Incubator</a>
      </div>

      <div className="navbar-end">
        <img src='https://cdn.creazilla.com/icons/3251108/person-icon-md.png' alt='icon' width='20' height='20'></img>
      <a className="btn btn-ghost">{user.username} </a>

        <a className="btn bg-[#5EBB2B] text-white border-[#4eaa0c]">
          <Link to='/' onClick={handleSignOut}>Sign out</Link>
        </a>
      </div>
    </div>
      ) : (
      <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-2xl">Idea Incubator</a>
      </div>

      <div className="navbar-end">

        <a className="btn btn-ghost">
          <Link to="/sign-in">Log in</Link>
        </a>
        <a className="btn bg-[#5EBB2B] text-white border-[#4eaa0c]">
          <Link to="/sign-up">Sign up</Link>
        </a>
      </div>
    </div>
      )}
    </nav>

    )
}


export default NavBar;