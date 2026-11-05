import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Feature from './components/Feature'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    <div className='bg-gray-900 text-gray-100'>
      <Navbar/>
      <Home/>
     <Feature/>
      <Pricing/>
      <Contact/>
      <Footer/>
    </div>
      
    </>
  )
}

export default App
