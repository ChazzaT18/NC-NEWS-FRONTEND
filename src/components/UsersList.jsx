import { useState, useEffect } from "react";
import { getUsers } from '../api';
import UsersCard from './UsersCard'

const UsersList = () => {

const [usersData, setUsersData] = useState([]);

useEffect(() => {
    getUsers().then((users) => {
      setUsersData(users);
    });
  }, []);

  return (
    <>
    <h2>Users</h2>
    <ul className='users-list'>
        {usersData.map((user) => {
            return  <UsersCard key={user.username} user={user}/>
        })}
    </ul>
    </>
  )

}

export default UsersList;