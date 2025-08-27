import axios from 'axios';
const apiUrl= import.meta.env.VITE_API_URL ||   'http://localhost:5000';
export const createShortUrl = async (longUrl,token) => {
    try {
        const response = await axios.post(apiUrl+'/api/shorten', { longUrl },
            {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,   
        },
      }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating short URL:', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        else{
            throw new Error('An unexpected error occurred while creating the short URL.please try again later.')
        }
    }
    };