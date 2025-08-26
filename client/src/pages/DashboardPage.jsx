

import React , {useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import { getUserLinks } from '../services/linkService.jsx';
import Spinner from '../components/Spinner.jsx';


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
        if(token){
          const response = await getUserLinks(token);
          setLinks(response.data);
        }

      }
      catch(err){
        console.error('Error fetching links 2:', err.status);
        setError(err.error || 'Failed to fetch links');
        if (err.status == 401){ 
          logout();
          navigate('/');

          
        }
      }
      finally{
        setisLoading(false);
      }
    };
    fetchLinks();

  },[token,logout]);
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
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">

      <h2 className="text-3xl font-bold">My Dashboard</h2>
      </div>
      {/* <p className="p-6 text-center text-slate-500">Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p> */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{marginTop:'2rem'}}>
        { isLoading? <div className="p-12 flex justify-center"><Spinner /></div> :
          error?(
            <p className="p-6 text-red-500">Error:{error}</p>

          ): links.length > 0 ?(<>
            <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr >
                <th className="p-4 font-semibold">Original URL</th>
                <th className="p-4 font-semibold">Short URL</th>
                <th className="p-4 font-semibold text-center">Clicks</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Use the .map() method to iterate over the links array */}
              {links.map((link) => (
                // 5. The `key` prop is crucial for React's performance and correctness.
                //    We use the unique `_id` from MongoDB as the key.
                <tr key={link._id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4 max-w-xs truncate">
                    {/* Display a truncated version of the long URL for cleaner UI */}
                    <a href={link.longurl} title={link.longurl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link.longurl.substring(0, 50)}...
                    </a>
                  </td>
                  <td className='p-4'>
                    {/* The short URL is a clickable link that opens in a new tab */}
                    <a href={link.shorturl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-mono hover:underline">
                      {link.shorturl}
                    </a>
                  </td>
                  <td className="p-4 text-center font-semibold">
                    {link.Clicks}
                  </td>
                  <td className="p-4">
                    <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md" onClick={()=>{handleCopy(link.shorturl.link._id)}}>
                      {copyLinkId === link._id ? 'Copied!' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          </>
          
        ) : (
          <p className="p-6 text-center text-slate-500">You haven't created any short links yet.</p>
        )}
          

      </div>
      
      


      


    </div>
  )
}

export default DashboardPage