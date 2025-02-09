import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts } from '../../store/slices/sellerSlice';
import DisplayErrors from '../auth/DisplayErrors';

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
            <div key={product._id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <DisplayErrors error={errorMessages} />
    </div>
  );
};

export default SellerHomes;

