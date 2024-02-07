import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getUsers } from "../api";
import UserLogInCard from "./UserLogInCard";
import UserContext from "../contexts/UserContexts";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const loggedInUser = useContext(UserContext);
  const currentUser = loggedInUser.loggedInUser;

  useEffect(() => {
    getUsers().then((users) => {
      setUsersData(users);
    });
  }, []);

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <nav>
        <button className="nav-buttons">
          <Link to="/" className="nav-link">
            Articles
          </Link>
        </button>
        <button className="nav-buttons">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </button>
        <button className="nav-buttons" onClick={toggleLoginForm}>
          {currentUser === undefined ? (
            "Log In"
          ) : (
            <>
              <span id="logged-in-as-tag">Logged in as:</span>{" "}
              {currentUser.username}
              <img
                id="logged-in-users-avatar"
                src={currentUser.avatar_url}
                alt="User Avatar"
              />
            </>
          )}
        </button>
      </nav>
      {showLogin && (
        <div className="floating-menu">
          <button className="exit-button" onClick={toggleLoginForm}>
            Exit
          </button>
          <ul className="user-login">
            {usersData.map((user) => (
              <UserLogInCard key={user.username} user={user} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
