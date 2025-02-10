import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts } from '../../store/slices/sellerSlice';
import DisplayErrors from '../auth/DisplayErrors';
import SellerHome from './SellerHome';

const SellerHomes = () => {
  const { products, isLoading, errorMessages } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <SellerHome product={product} key={product._id}></SellerHome>
          ))}
        </div>
      )}
      <DisplayErrors error={errorMessages} />
    </div>
  );
};

export default SellerHomes;

