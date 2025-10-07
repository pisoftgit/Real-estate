import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './Components/Loader';


// Pages
import Home from './Pages/Home';
import SearchPage from './Pages/Search';
// import Details from './Pages/Details';
import PropertyDetails from './Pages/PropertyDetails';
import AgentProfile from './Components/agents';
import AgentsPage from './Pages/AllAgents';
import UserLogin from './Components/account/UserLogin';



// Pages Wrapper includes all routes

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Routes>
          <Route index element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/allAgents' element={<AgentsPage />} />
          <Route path='/PropertyDetails' element={<PropertyDetails />} />
          <Route path='/agents' element={<AgentProfile />} />
          <Route path='/userLogin' element={<UserLogin />} />
        </Routes>
      )}
    </>
  );
}




// main app exporting 

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
