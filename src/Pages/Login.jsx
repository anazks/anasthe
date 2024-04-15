import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Import withRouter
import './Reg.css';
import Axios from '../Axios';

function Login() { // Destructure history from props
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

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

    // Handle form submission
    console.log(formData);
    // Reset form data
    setFormData({
      email: '',
      password: ''
    });
    Axios.post('/loginBlinds', formData)
      .then((response) => {
        if (response.data !=false) {
          console.log(response.data,"------------");
          // Save the response data to localStorage
          localStorage.setItem('userData', JSON.stringify(response.data));
          // Redirect to home page
          navigate('/home')
        } else {
          navigate('/')
          // Show error message
          // setError('Incorrect password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show error message
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Email' />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Password' />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>} {/* Show error message */}
       <span> <Link to={'/Register'}>New User? Create an Account</Link></span>
      </form>
    </div>
  );
}

export default Login; // Wrap component with withRouter
