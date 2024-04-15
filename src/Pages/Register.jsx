import React, { useState } from 'react';
import './Reg.css'
import { useNavigate,Link } from 'react-router-dom'; // Import withRouter

import Axios from '../Axios'
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle form submission
    console.log(formData);
    // Reset form data
    setFormData({
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
    Axios.post('/addBlinds',formData).then((response)=>{
          if(response){
            console.log(response)
          }else{
            console.log("error")
          }
    })
  };

  return (
    <div className='form-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder='Username' />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Email' />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required  placeholder='Mobile'/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Password' />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder='Confirm Password' />
        </div>
        <button type="submit">Register</button>
         <span> <Link to={'/'}>already have an account? Login</Link></span>
      </form>
    </div>
  );
}

export default Register;
