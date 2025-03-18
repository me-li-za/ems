import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Employees from './pages/Employee';
import AddEmployee from './pages/AddEmployee';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={ !user ? <Login /> : <Navigate to="/employees"/>} />
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/employees"/>} />
        <Route path="/register" element={ user ? <Register />: <Navigate to="/login" />} />
        <Route path="/profile" element={ user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={ user ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/employees" element={ user ? <Employees /> : <Navigate to="/login" />}/>
      </Routes>
    </Router>
  );
}

export default App;
