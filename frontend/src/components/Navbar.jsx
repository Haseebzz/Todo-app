import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {

  const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["access_token"]);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/")
        window.location.reload();
       
    }


    return (
      <div className="flex items-center justify-between bg-gray-200 py-2 px-4">
        <div className="flex items-center">
        <Link to="/dashboard">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </Link>
        </div>
        <span className="mr-4 font-bold text-2xl">Hi {window.localStorage.username}</span>
        <div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mr-4"
          >
            Logout
          </button>
          <Link to="/profile" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
            My Profile
          </Link>
        </div>
      </div>
    );
    
}

export default Navbar