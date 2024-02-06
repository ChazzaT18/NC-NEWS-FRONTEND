import { useContext } from "react";
import UserContext from "../contexts/UserContexts";

const UserLogInCard = ({ user }) => {
  const { setLoggedInUser, loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  return (
    <>
      <li className="user-login-card">
        <img
          className="user-login-img"
          src={user.avatar_url}
          alt={user.username}
        />{" "}
        <br />
        {loggedInUser === user ? `Logged in` : (
          <button
            onClick={() => {
              setLoggedInUser(user);
            }}
          >
            {`Login as ${user.username}`}
          </button>
        )}
      </li>
    </>
  );
};

export default UserLogInCard;
