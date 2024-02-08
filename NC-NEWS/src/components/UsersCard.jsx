const UsersCard = ({user}) => {
    console.log({user})
    return (
        <>
        <li className="user-card">
            <h3>{user.username}</h3>
            <p>{user.name}</p> <br/>
            <img className="user-card-img" src={user.avatar_url} alt={user.username} /> <br/>
        </li>
        </>
    )
}

export default UsersCard;