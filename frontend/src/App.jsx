import React from 'react'
import AddProduct from './components/seller/AddProduct'
import Navbar from './components/nav/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import CustomerHomes from './components/customer/CustomerHomes'
import { useSelector } from 'react-redux'
import SellerHomes from './components/seller/SellerHomes'

const App = () => {
  const {userType}=useSelector((state)=>state.auth);
  return (
    <div className='dark:bg-gray-900 dark:text-white min-h-screen'>
      <BrowserRouter>
        <Navbar />
        <div className='w-[95%] sm:w-[90%] md:w-[80%] mx-auto m-2'>
        <ToastContainer />
          <Routes>
            <Route path="/" element={userType==="customer" || userType===null ? <CustomerHomes/>:<SellerHomes/>} />
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

