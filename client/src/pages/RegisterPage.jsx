
import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/authContext';


const RegisterPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const {login}=useAuth();
  const navigate=useNavigate();
  const handleChange = async (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setSuccess('');
    try{

      const response= await registerUser(formData);
      console.log('Registration successful:', response);
      setSuccess('Registration successful! You can now log in.');
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setConfirmPassword('');
      login(response.data.token);
      console.log('token saved to localStorage');
      navigate('/');


    }
    catch(err){
      
      setError(err.message);

    }




  };

  return (
    <div className="max-w-md mx-auto">
    <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-2">Create your account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className='form-group'>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name:</label>
            <input type="text" id='name' placeholder='Enter Your Name' value={formData.name} onChange={handleChange } name='name'
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            
          </div>
          <div className='form-group'>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email:</label>
            <input type="email" id='email'
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Enter Your Email'
            value={formData.email}
            onChange={handleChange} name='email'
            required
            />
            
          </div>
          <div  className='form-group'>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password:</label>
            <input type="password" id='password' placeholder='Enter Your Password'
            value={formData.password}
            onChange={handleChange} name='password'
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
          </div>
          <div >
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1">Confirm Password:</label>
            <input type="password" id='confirm-password' placeholder='Confirm Your Password' 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

          </div>  
          <button type='submit' className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">Register</button>
        
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {success && <p className='success' style={{color:'green'}}>{success}</p>}
      <p className="mt-6 text-center text-sm">already have an account?{' '}<Link to='/login' className="font-medium text-blue-600 hover:underline">login Here</Link></p>



    </div>
    </div>
  )
}

export default RegisterPage