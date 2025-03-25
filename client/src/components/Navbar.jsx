import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="text-xl font-bold text-gray-800">
            Task Manager
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-600">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
