import axios from 'axios';

const apiUrl='http://localhost:5000/api/auth/';

export const registerUser=async (userData) => {
    try{
        const response = await axios.post(apiUrl+'register',userData);
        return response.data;
    }catch(error){
        console.error('Error registering user:',error); 
        if (error.response && error.response.data){
            throw error.response.data;
        }
        else{
            throw new Error('An unexpected error occurred while registering. Please try again later.');
        }
}
};

export const loginUser=async (credentials)=>{
    try{
        const response = await axios.post(apiUrl+'login',credentials);
        return response.data;
    }catch(error){
        console.error('Error logging in user:',error); 
        if (error.response && error.response.data){
            throw error.response.data;
        }
        else{
            throw new Error('An unexpected error occurred while logging in. Please try again later.');
        }
    }


};