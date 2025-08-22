

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';


const DashboardPage = () => {
  const {logout}=useAuth();
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className='dashboard-container'>
      <h2>My Dashboard</h2>
      <p>Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p>
      <div className='links-list-placeholder'>

      </div>
      <button className='btn btn-logout' onClick={handleLogout} style={{marginTop:'2rem'}}>Logout</button>


      


    </div>
  )
}

export default DashboardPage