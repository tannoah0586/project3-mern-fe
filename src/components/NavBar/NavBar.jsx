const NavBar =()=>{

return (
    <nav>
        {user ? (
            <ul>
            <li><Link to='/'>HOME</Link> </li>
            <li><Link to='/ideas'>IDEAS</Link></li>
            <li><Link to='/' onClick={handleSignOut}>SIGN OUT</Link></li>
            </ul>
        ) : (
            <ul>
                <li><Link to='/'>HOME</Link></li>
                <li><Link to='sign-up'>SIGN UP</Link></li>
                <li><Link to='/sign-in'>SIGN IN</Link></li>
            </ul>


        )}
    </nav>
)};

export default NavBar;