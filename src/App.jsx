import IdeaList from "./components/IdeaList/IdeaList";
import { useContext, useState, useEffect } from 'react';
import * as ideaService from './services/ideaService';
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const [ideas,setIdeas] = useState([]);
  const { user } = useContext(UserContext);
  

  useEffect(()=> {
    const fetchAllIdeas = async () => {
      const ideasData = await ideaService.index();
      setIdeas(ideasData);
    }
    if (user) fetchAllIdeas();
  },[user]);


  return(
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={user ? <Dashboard /> : <Landing />} />
      {user ? (
        <>
          <Route path='/ideas' element={<IdeaList />} />
        </>
      ) : (
        <>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
        </>
      )}
    </Routes>
  </>
  )
}

export default App;