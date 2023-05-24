import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Dashboard = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todo/${window.localStorage.userID}/tasks`);
        setTasks(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/todo/', {
        user: window.localStorage.userID,
        text: task,
        isDone: false
      });
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };



  const handleDelete = async (taskId) => {
      // Implement your edit logic here
      try {
        const result = await axios.delete(`http://localhost:3000/todo/${taskId}/tasks`, {
        });
      } catch (error) {
        console.error(error);
      }

    console.log(`Deleting task with ID: ${taskId}`);
  };

  const handleCheckboxChange = async (taskId) => {
  try {
    // Find the task by its ID in the tasks array
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return {
          ...task,
          isDone: !task.isDone, // Toggle the isDone property
        };
      }
      return task;
    });

    // Update the tasks state with the updated tasks array
    setTasks(updatedTasks);

    // Make an API call to update the task on the server
    await axios.put(`http://localhost:3000/todo/${taskId}/tasks`, {
      isDone: updatedTasks.find((task) => task._id === taskId).isDone,
    });

    console.log(`Checkbox change for task with ID: ${taskId}`);
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = async (taskId) => {
  try {
    const updatedTaskText = prompt('Enter the updated task:');
    if (updatedTaskText) {
      const response = await axios.put(`http://localhost:3000/todo/${taskId}/tasks`, { text: updatedTaskText });
      console.log(response.data); // Handle the response as needed
    }
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen -mt-28">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="todoInput"
              type="text"
              placeholder="Enter your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>

      <div className="-mt-60">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-600">No tasks yet</div>
        ) : (
          <ul className="bg-white shadow-md rounded px-4 py-2">
            {tasks.map((task) => (
              <li key={task._id} className="flex items-center justify-between text-gray-800 py-2">
                <div>
                  <input
                    type="checkbox"
                    className="mr-2 form-checkbox h-4 w-4 text-blue-500"
                    checked={task.isDone}
                    onChange={() => handleCheckboxChange(task._id)}
                  />
                  {task.text}
                </div>
                <div className="flex">
                  <button
                    className="mr-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                    onClick={() => handleEdit(task._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm1 5a1 1 0 0 0-1 1v.755c0 .282.114.548.316.746l2.57 2.57a1 1 0 0 0 1.414 0l6.33-6.33a1 1 0 0 0 0-1.414l-2.57-2.57a1 1 0 0 0-1.414 0l-6.33 6.33A.996.996 0 0 0 4 15.755V15a1 1 0 0 0 1-1z"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500 focus:outline-none"
                    onClick={() => handleDelete(task._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm4.243 11.757a.5.5 0 0 1-.708 0L10 10.707l-3.536 3.536a.5.5 0 0 1-.708-.708L9.293 10 5.757 6.464a.5.5 0 0 1 .708-.708L10 9.293l3.536-3.536a.5.5 0 0 1 .708.708L10.707 10l3.536 3.536a.5.5 0 0 1 0 .708z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
