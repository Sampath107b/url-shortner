
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/authContext.jsx';








const LoginPage = () => {
  const [formData, setFormData]=React.useState({
    email:'',
    password:''
  });
  const [error, setError]=React.useState(null);
  const {login}=useAuth();
  const navigate=useNavigate();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!formData.email || !formData.password){
      setError('Please fill in all fields');
      return;
    }
    setError(null);
    try{
      const response=await loginUser(formData);
      console.log('Login successful:',response.token);
      if (response.token){
        // localStorage.setItem('token',response.token);
        login(response.token);
        console.log('Token saved to localStorage');
        navigate('/');
      }

    }
    catch(err){
      const errorMessage = err.error || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    }




  };



  return (
    <div className="max-w-md mx-auto">
    <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
      <p className="text-center text-slate-500 mb-6">login to check your dashboard</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email:</label>
          <input type="email" id='email' placeholder='enter your email'
          value={formData.email}
          onChange={handleChange} name='email'
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password:</label> 
          <input type="password" id='password' placeholder='enter your password'
          value={formData.password}
          onChange={handleChange} name='password'
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           required />
        </div>
        <button type='submit' className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">Login</button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
       <p className="mt-6 text-center text-sm">Don't have an account?{' '} <Link to='/register' className="font-medium text-blue-600 hover:underline">register Here</Link></p>

      
    </div> 
    </div>
  )
};

export default LoginPage;