import axios from 'axios';

const API_URL =import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getUserLinks = async (token) => {

    const config = {
        headers: {
            'x-auth-token': token ,
        },
    };
    try{
    const response = await axios.get(API_URL+'/api/links/my-links', config);
    return response.data;
    }
    catch(error){
        console.error('Error fetching user links:', error);
        if (error.response && error.response.data) {
            console.error(error.status)
            throw error;
            
        }
        else{
            throw error;
        }
    }

}