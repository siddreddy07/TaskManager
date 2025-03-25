import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Layout from './Layout';
import Task from './pages/Tasks';
import { UserContext } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { user, checkAuth } = useContext(UserContext);

  useEffect(() => {
    checkAuth(); // ✅ Run authentication check only on mount
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* ✅ Redirect to login if no user */}
          <Route
            index
            element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
