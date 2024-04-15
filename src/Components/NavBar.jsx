import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { FaBatteryFull } from 'react-icons/fa';

export default function NavBar() {
  const [chargePercentage, setChargePercentage] = useState(90);
  const [userData, setUserData] = useState(null); // Changed Data to userData
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData[0]);
      console.log(storedUserData,"--;;;;;;;;;;;;")
    }

    // Function to update charge percentage every hour
    const updateChargePercentage = () => {
      // Decrement the current charge percentage by 1
      setChargePercentage(prevChargePercentage => prevChargePercentage - 1);
    };

    // Call the update function initially
    updateChargePercentage();

    // Schedule the update function to run every hour
    const intervalId = setInterval(updateChargePercentage, 3600000); // 1 hour in milliseconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    // Navigate to login route
    navigate('/');
  };

  return (
    <div className='navBar'>
      <div>
        <h1>Drug Calculator</h1>
      </div>
    </div>
  );
}
