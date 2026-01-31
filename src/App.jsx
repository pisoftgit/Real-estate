import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './Components/Loader';

// Pages
import Home from './Pages/Home';
import SearchPage from './Pages/Search';
import PropertyDetails from './Pages/PropertyDetails';
import AgentProfile from './Components/agents';
import AgentsPage from './Pages/AllAgents';
import UserLogin from './Components/account/Login/UserLogin';
import UserRegister from './Components/account/Register/Register';

// Protected route
import ProtectedRoute from './Components/account/ProtectedRoute';

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
          {/* ✅ Protected Routes */}
          <Route
            index
            element={
              // <ProtectedRoute>
                <Home />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              // <ProtectedRoute>
                <SearchPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/allAgents"
            element={
              // <ProtectedRoute>
                <AgentsPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/PropertyDetails/:id"
            element={
              <ProtectedRoute>
                <PropertyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <ProtectedRoute>
                <AgentProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/UserRegister" element={<UserRegister />} />
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
