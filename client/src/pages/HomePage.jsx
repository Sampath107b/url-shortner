

import React,{useState} from 'react'
import { createShortUrl } from '../services/apiService';


const HomePage = () => {
  const [longUrl, setLongUrl]=useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if (!longUrl) {
      alert('Please enter a URL');
      return;
    }
    try{
    const response = await createShortUrl(longUrl);

    console.log('Shortened URL:', response.shortUrl);
    }
    catch(error){
      console.error('Error:', error);
      alert(`Error: ${error.message || 'An unexpected error occurred. Please try again later.'} `);
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
    </div>
  );
};

export default HomePage