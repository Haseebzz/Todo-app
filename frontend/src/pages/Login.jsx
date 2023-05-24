import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies} from "react-cookie"
import { Link } from 'react-router-dom'
const Login = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[_, setCookies] = useCookies(["access_token"]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const result = await axios.post("http://localhost:3000/auth/login", {
            username,
            password
        })
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        window.localStorage.setItem("username", result.data.username);
        navigate("/dashboard");
    } catch (error) {
        alert("login failed")
        console.error(error);
    }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1285308242/photo/to-do-list-text-on-notepad.jpg?b=1&s=170667a&w=0&k=20&c=xAUt6BWO1oyibsevhrqjfNH_etMfz3oOQESJCkn0H3Y=')" }}>
      <div className="bg-white bg-opacity-75 p-6 rounded-md shadow-lg flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mb-4">Todo app</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-2">
            Username:
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
  
          <label className="mb-2">
            Password:
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
        
            />
          </label>
  
          <button className="py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded " type="submit">
            Login
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
  Dont have an account? <Link to="/" className="text-blue-500 cursor-pointer">Register</Link>
</p>
        </form>
      </div>
    </div>
  )
}

export default Login