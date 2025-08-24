

import React , {useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { getUserLinks } from '../services/linkService.jsx';


const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  const {token,logout}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchLinks = async ()=>{
      try{
        if (token){
          const response = await getUserLinks(token);
          setLinks(response.links);
        }

      }
      catch(err){
        console.error('Error fetching links:', err);
        setError(err.error || 'Failed to fetch links');
      }
      finally{
        setLoading(false);
      }
    };
    fetchLinks();

  },[token]);





  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className='dashboard-container'>
      <h2>My Dashboard</h2>
      <p>Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p>
      <div className='links-list-placeholder' style={{marginTop:'2rem'}}>
        


      </div>
      <button className='btn btn-logout' onClick={handleLogout} style={{marginTop:'2rem'}}>Logout</button>


      


    </div>
  )
}

export default DashboardPage