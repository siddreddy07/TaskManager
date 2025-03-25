import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;



  const signup = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      setUser(res.data.registeredUser);
      await getAllTasks();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setUser(res.data.loggedinuser);
      await getAllTasks();
      toast.success(res.data.message);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout');
      setUser(null);
      setTasks([]);
      toast.success('Logged out successfully');
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth');
      if(res?.data){
        setUser(res.data.user);
      } else {
        setUser(null)
      }
      await getAllTasks();
      console.log(user)
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data.user.tasks);
    } catch (error) {
      console.log(error.response?.data?.message || 'Error fetching tasks');
    }
  };

  const createTask = async (title, description) => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
      });
      setTasks(prev => [...prev, res.data.newTask]);
      toast.success('Task created!');
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedData);
      setTasks(prev =>
        prev.map(task => (task._id === taskId ? res.data.updatetask : task))
      );      
      toast.success('Task updated!');
      getAllTasks()
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted!');
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        tasks,
        loading,
        checkAuth,
        signup,
        login,
        logout,
        createTask,
        updateTask,
        deleteTask,
        getAllTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
