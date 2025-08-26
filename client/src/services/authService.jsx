import axios from 'axios';

const apiUrl= import.meta.env.VITE_API_URL ||   'http://localhost:5000';

export const registerUser=async (userData) => {
    try{
        const response = await axios.post(apiUrl+'/api/auth/register',userData);
        return response.data;
    }catch(error){
        console.error('Error registering user:',error); 
        if (error.response && error.response.data && error.response.data.error){
            throw new Error(error.response.data.error);
        }
        else{
            throw new Error('An unexpected error occurred while registering. Please try again later.');
        }
}
};

export const loginUser=async (credentials)=>{
    try{
        const response = await axios.post(apiUrl+'/api/auth/login',credentials);
        return response.data;
    }catch(error){
        console.error('Error logging in user:',error); 
        if (error.response && error.response.data && error.response.data.error){
            throw new Error(error.response.data.error);
        }
        else{
            throw new Error('An unexpected error occurred while logging in. Please try again later.');
        }
    }


};