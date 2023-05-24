import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userID = window.localStorage.userID;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await axios.put(`http://localhost:3000/auth/update/${userID}`, {
          username,
          password
      })
      window.localStorage.setItem("username", username);
      window.location.reload();
  } catch (error) {
      console.error(error);
  }
  };

  return (
    <><Navbar /><div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your username" 
              value={username}
        onChange={(e) => setUsername(e.target.value)}
              />
              
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="**********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          type='submit'> 
            Update Information
          </button>
        </form>
      </div>
    </div></>
  )
}

export default Profile