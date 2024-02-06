import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
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
        <ul>
          <li className="nav-buttons">
            <Link to="/" className="nav-link">
              Articles
            </Link>
          </li>
          <li className="nav-buttons">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-buttons">
            <button
              id="nav-login-button"
              className="nav-link"
              onClick={toggleLoginForm}
            >
              {currentUser === undefined ? (
                "Log In"
              ) : (
                <>
                  <span id='logged-in-as-tag'>Logged in as:</span> {currentUser.username}
                  <img id='logged-in-users-avatar'src={currentUser.avatar_url} alt="User Avatar" />
                </>
              )}
            </button>
          </li>
        </ul>
      </nav>
      {showLogin && (
        <div className="login-form">
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
