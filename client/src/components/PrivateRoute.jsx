
import React from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const PrivateRoute = ({children}) => {
    const {isAuthenticated,isLoading}=useAuth();
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isAuthenticated){
        return children;
        

    }
    return <Navigate to='/login' replace/>




}

export default PrivateRoute