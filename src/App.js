import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Display from './Components/Display';
import { Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
        <Routes>
           <Route path="/" element={ <Home/> } />
           <Route  path='/Register' element={<Register/>} />
           <Route  path='/login' element={<Login/>} />

        </Routes>
    </div>
  );
}

export default App;
