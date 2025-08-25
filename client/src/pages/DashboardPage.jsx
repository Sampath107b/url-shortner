

import React , {useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { getUserLinks } from '../services/linkService.jsx';


const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copyLinkId, setCopyLinkId] = useState(null);




  const {token,logout}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchLinks = async ()=>{
      try{
        if (token){
          
          const response = await getUserLinks(token);
          setLinks(response.data);
        }

      }
      catch(err){
        console.error('Error fetching links:', err);
        setError(err.error || 'Failed to fetch links');
      }
      finally{
        setisLoading(false);
      }
    };
    fetchLinks();

  },[token]);
  const handleCopy = async (text,linkId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyLinkId(linkId);
      setTimeout(() => setCopyLinkId(null), 2000); 
      alert('URL Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
      alert('Failed to copy URL.');
    }
  };

  





  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className='dashboard-container'>
      <h2>My Dashboard</h2>
      <p>Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p>
      <div className='links-list-placeholder' style={{marginTop:'2rem'}}>
        {isLoading ? (
          <p>Loading your links...</p>) :
          error?(
            <p className='error-message'>{error}</p>

          ): links.length>0 ?(
            <table className="links-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Original URL</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Short URL</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Clicks</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Use the .map() method to iterate over the links array */}
              {links.map((link) => (
                // 5. The `key` prop is crucial for React's performance and correctness.
                //    We use the unique `_id` from MongoDB as the key.
                <tr key={link._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px', wordBreak: 'break-all' }}>
                    {/* Display a truncated version of the long URL for cleaner UI */}
                    <a href={link.longurl} title={link.longurl} target="_blank" rel="noopener noreferrer">
                      {link.longurl.substring(0, 50)}...
                    </a>
                  </td>
                  <td style={{ padding: '8px' }}>
                    {/* The short URL is a clickable link that opens in a new tab */}
                    <a href={link.shorturl} target="_blank" rel="noopener noreferrer">
                      {link.shorturl}
                    </a>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    {link.Clicks}
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button type="button" className="btn btn-copy btn-small"onClick={()=>{handleCopy(link.shorturl.link._id)}}>
                      {copyLinkId === link._id ? 'Copied!' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You haven't created any short links yet. Go to the homepage to create your first one!</p>
        )}
          


      </div>
      <button className='btn btn-logout' onClick={handleLogout} style={{marginTop:'2rem'}}>Logout</button>


      


    </div>
  )
}

export default DashboardPage