
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';








const LoginPage = () => {
  const [formData, setFormData]=React.useState({
    email:'',
    password:''
  });
  const [error, setError]=React.useState(null);
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
        localStorage.setItem('token',response.token);
        console.log('Token saved to localStorage');
        navigate('/dashboard');
      }

    }
    catch(err){
      const errorMessage = err.error || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    }




  };



  return (
    <div className='auth-container'>
      <h2>Welcome Back</h2>
      <p>login to check your dashboard</p>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' placeholder='enter your email'
          value={formData.email}
          onChange={handleChange} name='email'
          
          required />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label> 
          <input type="password" id='password' placeholder='enter your password'
          value={formData.password}
          onChange={handleChange} name='password'
           required />
        </div>
        <button type='submit' className='btn'>Login</button>
      </form>
       <p className='auth-switch'>don't have an account? <Link to='/register'>register Here</Link></p>

      
      
    </div>
  )
}

export default LoginPage