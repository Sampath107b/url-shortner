

import React,{useState} from 'react'
import { createShortUrl } from '../services/apiService';



const HomePage = () => {
  const [longUrl, setLongUrl]=useState("");
  const [shortUrlData, setShortUrlData]=useState(null);
  const [error, setError]=useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!longUrl) {
      alert('Please enter a URL');
      setError('Please enter a URL');
      setShortUrlData(null);

      return;
    }
    try{
      setError("");
      const response = await createShortUrl(longUrl);
      setShortUrlData(response.data);
      
    }
    catch(error){
      setError(error.message || 'An error occurred while creating the short URL.');
      setShortUrlData(null);
      console.error('Error from api:', error);
      
    }

  }




  return (
    <div className='homepage-container'>
       <h2>URL SHORTNER</h2>
       <p>Enter a long url to make it short and easy to share</p>
       <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="LongUrl-input">Enter your Long-Url:</label>
            <input type="url"
            id="LongUrl-input"
            placeholder='https://example.com/your-long-url'
            value={longUrl}
            onChange={(e)=>setLongUrl(e.target.value)}
            required
          />
          </div>
        <button type='submit'>short Url</button>
        
        </form>

        {error && (
        <div className="error-container" style={{ color: 'red', marginTop: '1rem' }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
        )}
        {shortUrlData && (
        <div className="result-container" style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
          <h3>Your Short URL is ready!</h3>
          <p>
            <strong>Short Link:</strong> 
             <a 
              href={shortUrlData.shorturl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#007bff' }}
            >
              {shortUrlData.shorturl}
            </a>
          </p>
          <p style={{ fontSize: '0.8rem', color: '#555' }}>
            Original URL: {shortUrlData.longurl.substring(0, 70)}...
          </p>
        </div>
      )}





    </div>
  );
};

export default HomePage