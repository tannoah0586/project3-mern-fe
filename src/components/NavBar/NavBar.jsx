import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import User from '../../assets/user.svg';
import Idea from '../../assets/idea-bulb.svg'

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav className="fixed w-full z-50">
            {user ? (
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li><Link to="/" className="hover:bg-gray-200 block py- px-4 rounded text-lg">Home</Link></li>
                                <li><Link to="/ideas/new" className="hover:bg-gray-200 block py-2 px-4 rounded">+ Share a new idea</Link></li>
                                <li><Link to="/ideas" className="hover:bg-gray-200 block py-2 px-4 rounded">All Ideas</Link></li>
                                <li><Link to="/yourIdeas" className="hover:bg-gray-200 block py-2 px-4 rounded">Your Ideas</Link></li>
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-2xl">
                        <img src={Idea} alt="Idea Logo" className="h-6 w-6 mr-2" />
                        Idea Incubator</Link>
                    </div>

                    <div className="flex space-x-4 items-center">
                        <Link to="/" className="btn btn-ghost">Home</Link>
                        <Link to="/ideas" className="btn btn-ghost">All Ideas</Link>
                        <Link to="/yourideas" className="btn btn-ghost">Your Ideas</Link>
                    </div>

                    <div className="navbar-end flex items-center space-x-4">
                        <img src={User} alt='icon' className='h-5 w-5' />
                        <span className="btn btn-ghost">{user.username}</span>
                        <Link
                            to="/"
                            onClick={handleSignOut}
                            className="btn rounded-full bg-[#5EBB2B] text-white border-[#4eaa0c]"
                        >
                            Sign out
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <Link to="/" className="btn btn-ghost text-2xl">
                        <img src={Idea} alt="Idea Logo" className="h-6 w-6 mr-2" />
                        Idea Incubator
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <Link to="/sign-in" className="btn btn-ghost">Log in</Link>
                        <Link to="/sign-up" className="btn rounded-full bg-[#5EBB2B] text-white border-[#4eaa0c]">Sign up</Link> {/* Changed to rounded-full */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;