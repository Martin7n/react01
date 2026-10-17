import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import About from './components/StaticComponents/About'
import Catalog from './components/MainComponents/Catalog'
import Login from './components/AuthComponents/Login'
import Register from './components/AuthComponents/Register'
import Logout from './components/AuthComponents/Logout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    

      <BrowserRouter>

      <Routes>     
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/catalog" element={<Catalog />} />



      </Routes>
    </BrowserRouter>


    
    </>
  )
}

export default App
