
import { useState } from 'react'
import './App.css'

function App() {

  const [open, setOpen] = useState(false)
  

  return (
    <>
      <nav className='bg-white shadow-md px-6 py-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
         {/* Desktop Menu */}
         <div className='text-blue-700 font-bold text-2xl'>Brand</div>

        <ul className='hidden md:flex gap-6 text-gray-600 font-medium'>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>About</a></li>
          <li><a href='#'>Service</a></li>
          <li><a href='#'>Contact</a></li>
        </ul>

        {/* Mobile menu icon */}
          <div className='md:hidden'>
            <button
              className='text-3xl'
              onClick={() => setOpen(!open)}
              aria-label='Toggle menu'
            >
              &#9776;
            </button>
          </div>

        </div>

         {/* Mobile menu */}
        <div
          className={`md:hidden ${open ? '' : 'hidden'}`}
        >
          <ul className='flex flex-col gap-3 pt-4 text-gray-600 font-medium'>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About</a></li>
            <li><a href='#'>Service</a></li>
            <li><a href='#'>Contact</a></li>
          </ul>
        </div>

      </nav>

      
    </>
  )
}

export default App
