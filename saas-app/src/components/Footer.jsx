import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className='bg-gray-900 text-white p-6 mt-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left'>
        <div>
          <h3 className='font-bold text-xl mb-2'>Saas</h3>
          <p className='text-gray-400'>2026 All rights reserved.</p>
        </div>
        <div>
          <h4 className='font-bold mb-2'>Links</h4>
          <ul className='text-gray-300 spay-y-1'>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold mb-2'>Follow Us</h4>
          <ul className='flex justify-center md:justify-start space-x-4'>
            <li><a href='#'>🐦</a></li>
            <li><a href='#'>📕</a></li>
            <li><a href='#'>📷</a></li>
          </ul>
        </div>
      </div>

      </footer>
    </>
  )
}

export default Footer