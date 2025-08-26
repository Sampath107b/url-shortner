import React from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import './Navbar.css'
import {useAuth} from '../context/authContext.jsx'


const Navbar = () => {
  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();
    const location = useLocation();
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
            <Link to='/'>Short.url</Link>
            

        </div>
        <ul className="flex gap-4 items-center">
            {isAuthenticated ? (
                <>
                <li>
                    <Link to='/' className="hover:text-blue-300">HomePage</Link>

                </li>
                <li>
                    <Link to='/dashboard' className="hover:text-blue-300">Dashboard</Link>
                </li>
                <li>
                    <button onClick={() => {
                        logout();
                        navigate('/login' , {replace: true});
                    }} className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-sm">Logout</button>
                </li>
                </>
            ) : (
                <>
                <li>
                    <Link to='/' className="hover:text-blue-300">HomePage</Link>

                </li>
                <li>
                    <Link to='/login' className="hover:text-blue-300">Login</Link>
                </li>
                <li>
                    <Link to='/register' className="hover:text-blue-300">Register</Link>
                </li>
                </>
            )}
        </ul>
      </div>
    </nav>
    
  )
}

export default Navbar