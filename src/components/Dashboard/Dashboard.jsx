import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = ({ ideas }) => {
  const { user } = useContext(UserContext);
  // const [ likesCount, setlikesCount ] = useState([]);



  const likedIdeas = ideas.filter((idea) => idea.reactions.type === "Like")
  console.log(likedIdeas)

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all ideas.
      </p>
      <ul>
        {ideas
          .map(idea => ({
            ...idea,
            likesCount: idea.reactions.filter(reaction => reaction.type === "Like").length
          }))
          .sort((a, b) => b.likesCount - a.likesCount) // Sort by likes count descending
          .map((idea) => {
            return (
              <li key={idea._id}>
                {idea.title} - {idea.likesCount} likes
              </li>
            );
          })}
      </ul>
    </main>

    
  );

  
};

export default Dashboard;
