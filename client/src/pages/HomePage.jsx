

import React,{useState} from 'react'
import { createShortUrl } from '../services/apiService';
import { set } from 'mongoose';



const HomePage = () => {
  const [longUrl, setLongUrl]=useState("");
  const [shortUrlData, setShortUrlData]=useState(null);
  const [error, setError]=useState("");
  const [isCopied, setIsCopied]=useState(false);
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setIsCopied(false);
    setError("");
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
  const handleCopy = async () => {
    if (!shortUrlData) return;
    try{
      await navigator.clipboard.writeText(shortUrlData.shorturl);
      setIsCopied(true);
      setTimeout(()=>{setIsCopied(false);},2000);
      alert('Short URL copied to clipboard!');
    }
    catch(err){
      console.error('Failed to copy:', err);
      alert('Failed to copy the URL. Please try manually.');
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
            <button type='button' className='btn btn-copy' onClick={handleCopy}>{isCopied?'copied!':'copy'}</button>
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