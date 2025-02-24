import React, { useEffect } from 'react'
import { fetchCustomerProducts } from '../../store/slices/customerSlice';
import { useSelector } from 'react-redux';

const CustomerHomes = () => {
  // useEffect(() => {
  //   fetchCustomerProducts();
  // }, [])
  // const { products, isLoading, errorMessages } = useSelector((state) => state.customer);
  return (
    <div>
      CustomerHomes
    </div>
  )
}

export default CustomerHomes
