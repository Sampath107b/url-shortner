import axios from 'axios';

const API_URL = '/api/links/';

export const getUserLinks = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
    const response = await axios.get(API_URL+'my-links', config);
    return response.data;
    }
    catch(error){
        console.error('Error fetching user links:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Failed to fetch user links');
        }
        else{
            throw new Error('Failed to fetch user links');
        }
    }

}