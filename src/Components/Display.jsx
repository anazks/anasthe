import React, { useEffect, useState } from 'react';
import './display.css';
import Axios from 'axios';
import useSound from 'use-sound';
import alarmSound from '../sounds/alarm.mp3';
import normal from '../sounds/normal.mp3';
import { dataRef } from '../Firebase';
import { MdCancel } from "react-icons/md";
import { useSpeechSynthesis } from 'react-speech-kit'; // Import useSpeechSynthesis hook

function Display() {
  const [spo2, setSpo2] = useState(0);
  const [bp, setBp] = useState(0);
  const [heartRate, setHeartRate] = useState(60);
  const [temp, setTemp] = useState(null);
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [bpm, setBpm] = useState('');
  const [alert, setAlert] = useState(false);
  const [box ,setBox] = useState(false)
  const [box2,setBox2]  =  useState(false)
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    weight: '',
    asaStatus1: '',
    asaStatus2: '',
    drugInduction: '',
    asaStatus3: '',
    drugMaintenance1: '',
    drugMaintenance2: '',
    contraindications: ''
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });



  const { speak } = useSpeechSynthesis(); // Initialize the useSpeechSynthesis hook

  const getDatafromDB = () => {
    try {
      dataRef.ref().child('test').on('value', (snapshot) => {
        const getData = snapshot.val();
        if (getData) {
          setTemp(getData.temp);
          setBpm(getData.bpm);
          setAlert(getData.irValue);
          setDistance(getData.distance);
          console.log(distance)
          if (getData.irValue > 1.1) {
            setNotification(true);
          } else {
            setNotification(false);
          }
          if (Number(getData.distance) < 15) {
            speak({ text: 'Obstacle ahead. Turn left or Right .' });
          } 
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      getDatafromDB();
    }, 1000);

    const interval = setInterval(() => {
      // Update values randomly
      setSpo2(Math.floor(Math.random() * 100));
      setBp(Math.floor(Math.random() * 200));
      setHeartRate(Math.floor(Math.random() * 150));
    }, Math.random() < 0.5 ? 1000 : 2000);

    return () => clearInterval(interval);
    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          getAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getAddress = (latitude, longitude) => {
    Axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
      .then((response) => {
        const results = response.data.address;
        setAddress(results.road);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        setAddress('Error fetching address');
      });
  };

  const closeNotification = () => {
    setNotification(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access all form data in the formData object
    console.log(formData);
    setBox(true)
    // You can perform further actions here, such as sending the data to a server
  };
  const openBox2 = ()=>{
    setBox2(true)
  }
  return (
    <>
      {notification &&
        <div className='Notification'>
          <div>
            <span>Alert user Need Help............................!!!!</span>
          </div>
          <div>
            <button className='closeBtn' onClick={closeNotification}><MdCancel/></button>
          </div>
        </div>
      }
        <div className='main'>
      <form onSubmit={handleSubmit}>
        <input type="text" name="age" placeholder='Enter your age' onChange={handleChange} />
        <input type="text" name="sex" placeholder='Sex' onChange={handleChange} />
        <input type="text" name="weight" placeholder='Enter your weight' onChange={handleChange} />
        <input type="text" name="asaStatus1" placeholder='ASA Status' onChange={handleChange} />
        <input type="text" name="asaStatus2" placeholder='ASA Status' onChange={handleChange} />
        <input type="text" name="drugInduction" placeholder='Drug for induction' onChange={handleChange} />
        <input type="text" name="asaStatus3" placeholder='ASA Status' onChange={handleChange} />
        <input type="text" name="drugMaintenance1" placeholder='Drug/gass for maintenance' onChange={handleChange} />
        <input type="text" name="drugMaintenance2" placeholder='Drug/gass for maintenance' onChange={handleChange} />
        <input type="text" name="contraindications" placeholder='Any contraindications for anesthesia' onChange={handleChange} />
        <input type="submit" className='btnSubmit' value='Go' />
      </form>

       {
        box ?
        <div className='form'>
        <div className="innerBox">
              <span>
                    <h3 style={{backgroundColor:'red'}}>Induction drug propofol</h3>
                      <h4>Induction Dose 1.5 2mg perkg over 2 Minutes</h4>
                      <h4>Induction drug Midazolam Dose 0.02 to 0.03 mg/kg slowly 2 over 2 minutes</h4>
              </span>
              <button className='proceed' onClick={openBox2}>Proceed to Maintenance</button>
        </div>
    </div> :""
       }
  {
    box2 ? 
    <div className='form'>
    <div className="innerBox">
      <span>
        <h3 style={{backgroundColor:'red'}}>Real Time Data</h3>
        <div className='contents'> <h2>SPO2</h2>  <span>{spo2}</span> </div>
        <div className='contents'> <h2>BP</h2>  <span>{bp}</span> </div>
        <div className='contents'> <h2>Heart Rate</h2>  <span>{heartRate}</span> </div>
      </span>
    </div>
  </div> :''
  }
      </div>
    </>
  );
}

export default Display;
