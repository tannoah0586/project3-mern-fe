import { useContext, useState, useEffect } from 'react';
import IdeaList from './components/IdeaList/IdeaList'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import * as ideaService from './services/ideaService';

const App =()=> {
  const [ideas,useIdeas] = useState([]);
  const { user } = useContext(userContext) ;

  useEffect(()=> {
    const fetchAllIdeas = async () => {
      const ideasData = await ideaService.index();
      setIdeas(ideasData);
    }
    if (user) fetchAllIdeas();
  },[user]);

  return(
    <>
      <NavBar />
      <Routes>
        <Route path='/' element= {user ? <Dashboard /> : <Landing />}/>
        {user? (
          <>
            <Route path='/ideas' element ={<IdeaList ideas={ideas} />}/>
          </>
        ) : (
          <>
            <Route path ='/sign-in' element = {<SignInForm />}/>
            <Route path ='/sign-up' element = {<SignUpForm />}/>
          </>
        )}
      </Routes>
    </>
  )};
export default App;