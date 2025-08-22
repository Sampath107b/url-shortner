
import React from 'react';
import {Link} from 'react-router-dom';
import { registerUser } from '../services/authService';


const RegisterPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
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

    }
    catch(err){
      const errorMessage = err.message || err.error || 'Registration failed. Please try again.';
      setError(errorMessage);

    }




  };

  return (
    <div className='auth-container'>
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' placeholder='Enter Your Name' value={formData.name} onChange={handleChange } name='name' required />
            
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' placeholder='Enter Your Email'
            value={formData.email}
            onChange={handleChange} name='email'
            required
            />
            
          </div>
          <div  className='form-group'>
            <label htmlFor="password">Password:</label>
            <input type="password" id='password' placeholder='Enter Your Password'
            value={formData.password}
            onChange={handleChange} name='password'
            required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id='confirm-password' placeholder='Confirm Your Password' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />

          </div>  
          <button type='submit' className='btn'>Submit</button>
        
      </form>
      {error && <p className='error' style={{color:'red'}}>{error}</p>}
      {success && <p className='success' style={{color:'green'}}>{success}</p>}
      <p className='auth-switch'>already have an account"?<Link to='/login'>login Here</Link></p>




    </div>
  )
}

export default RegisterPage