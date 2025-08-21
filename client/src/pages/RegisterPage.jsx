
import React from 'react'

const RegisterPage = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");


  return (
    <div className='auth-container'>
      <h2>Create your account</h2>
      <form>
          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' placeholder='Enter Your Name' />
            required
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' placeholder='Enter Your Email' />
            required
          </div>
          <div  className='form-group'>
            <label htmlFor="password">Password:</label>
            <input type="password" id='password' placeholder='Enter Your Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id='confirm-password' placeholder='Confirm Your Password' 
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            required
            />

          </div>  
          <button type='submit' className='btn'>Submit</button>
        
      </form>
      <p className='auth-switch'>already have an account"?</p>




    </div>
  )
}

export default RegisterPage