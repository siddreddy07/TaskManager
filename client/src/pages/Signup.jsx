import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');        // Added name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { signup } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password); 
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
