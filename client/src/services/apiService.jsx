import axios from 'axios';

export const createShortUrl = async (longUrl) => {
    try {
        const response = await axios.post('/api/shorten', { longUrl });
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