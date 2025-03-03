import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = ({ideas}) => {
  const { user } = useContext(UserContext);
  // const [ users, setUsers ] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const fetchedUsers = await userService.index();
  //       setUsers(fetchedUsers);
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   if (user) fetchUsers();
  // }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all ideas.
      </p>
      <ul>
        {ideas.map(idea => (
          <li key={idea._id}>{idea.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
