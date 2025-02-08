import React from 'react'
import AddProduct from '../components/seller/AddProduct'
import Navbar from '../components/nav/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const App = () => {
  return (
    <div className='dark:bg-gray-900 dark:text-white min-h-screen'>
      <BrowserRouter>
        <Navbar />
        <div className='w-[80%] mx-auto m-2'>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

