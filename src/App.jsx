import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Link, Route, Routes } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    

      <BrowserRouter>

      <Routes>     
        <Route path="/some" element={<Home />} />
      </Routes>
    </BrowserRouter>


    
    </>
  )
}

export default App
