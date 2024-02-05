import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <button>Articles</button>
        </Link>
        <button>Users</button>
        <button>Log In</button>
      </nav>
    </>
  );
};

export default NavBar;
