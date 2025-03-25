import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Task = () => {
  const { tasks, createTask, getAllTasks, updateTask, deleteTask, user, loading } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      await getAllTasks();
    };

    if (user) fetchTasks();
  }, [user]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert('Please fill in all fields');

    await createTask(title, description);
    await getAllTasks();
    setTitle('');
    setDescription('');
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    await getAllTasks();
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    console.log(task)
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = async () => {
    if (!editTitle || !editDescription) return alert('Please fill in all fields');
    const updatedData = { title: editTitle, description: editDescription };
    console.log(editTaskId)
    await updateTask(editTaskId, updatedData);
    await getAllTasks();
    setEditTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTitle('');
    setEditDescription('');
  };


  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome {user?.name || 'Guest'}! 📝
        </h1>

        <form onSubmit={handleAddTask} className="space-y-4 md:space-y-6 bg-gray-50 p-4 md:p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Create a new task</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
            Add Task
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Tasks</h2>

          {tasks && tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks found. Start by adding one!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200 shadow-sm rounded-lg p-4"
              >
                {editTaskId === task._id ? (
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="block w-full mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                      
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
