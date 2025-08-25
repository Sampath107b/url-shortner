

import React,{useState} from 'react'
import { createShortUrl } from '../services/apiService';
import Spinner from '../components/Spinner.jsx'



const HomePage = () => {
  const [longUrl, setLongUrl]=useState("");
  const [shortUrlData, setShortUrlData]=useState(null);
  const [error, setError]=useState("");
  const [isCopied, setIsCopied]=useState(false);
  const [isLoading, setIsLoading]=useState(false);
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setIsCopied(false);
    setError("");
    setIsLoading(true);
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
      
    }finally{
      setIsLoading(false);
      setLongUrl("");
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
    <div className="max-w-2xl mx-auto text-center">
       <h1 className="text-4xl font-bold mb-2">URL SHORTNER</h1>
       <p className="text-lg text-slate-600">Enter a long url to make it short and easy to share</p>
      <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            {/* <label htmlFor="LongUrl-input">Enter your Long-Url:</label> */}
            <input type="url"
            id="LongUrl-input"
            placeholder='https://example.com/your-long-url'
            value={longUrl}
            onChange={(e)=>setLongUrl(e.target.value)}
            className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            required
          />
        <button type='submit'disabled={isLoading}
        className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400 w-full sm:w-auto"
        >{isLoading?<Spinner size="small"/>:'Shorten'}</button>
        
        </form>
      

        {error && (
        
          <p className="mt-4 text-red-500"><strong>Error:</strong> {error}</p>
        
        )}
        {shortUrlData && (
        <div className="mt-6 pt-6 border-t text-left">
          <div className="flex justify-between items-center bg-slate-100 p-3 rounded-md">
          
          {/* <h3>Your Short URL is ready!</h3> */}
          
            {/* <strong>Short Link:</strong>  */}
             <a 
              href={shortUrlData.shorturl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-blue-600 break-all"
            >
              {shortUrlData.shorturl}
            </a>
            <button type='button' className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-md text-sm font-semibold ml-4" onClick={handleCopy}>{isCopied?'copied!':'copy'}</button>
          
          {/* <p style={{ fontSize: '0.8rem', color: '#555' }}>
            Original URL: {shortUrlData.longurl.substring(0, 70)}...
          </p> */}
          </div>
        </div>
      )}





    </div>
    </div>
  );
};

export default HomePage