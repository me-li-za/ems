import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Employee Management System</Link>
      <div>
        {user ? (
          <>
            <Link to="/employees" className="mr-4">Employees</Link>
            <Link to="/register" className="mr-4">Add User</Link>
            <Link to="/profile" className="mr-4">My Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
