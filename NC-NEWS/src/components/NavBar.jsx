import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
       <nav>
        <ul>
        <Link to="/" className='nav-link'>
          <li id='article-button' className='nav-buttons'>Articles</li>
        </Link>
        <Link to="/users" className='nav-link'>
          <li className='nav-buttons'>Users</li>
        </Link>
        <Link to="/login" className='nav-link'>
          <li className='nav-buttons'>Log In</li>
        </Link>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
