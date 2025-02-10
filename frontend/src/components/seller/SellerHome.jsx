import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/slices/sellerSlice";
import { toast } from "react-toastify";

const SellerHome = ({ product }) => {
  const dispatch = useDispatch();
  const {token}=useSelector((state)=>state.auth);

  const handleDeleteProduct = async (id) => {
    try {
      // dispatch(deleteProduct(id));
      const response = await fetch(
        `http://localhost:4002/api/seller/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status == 200) {
        dispatch(deleteProduct(id));
        toast(response.message);
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  }
  return (
    <div className="relative bg-white/30 backdrop-blur-lg border border-gray-300 shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      {/* Content Section */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500">Brand: <span className="font-medium">{product.brand}</span></p>
        <p className="text-lg font-semibold text-green-500">${product.price}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <p className="text-xs text-gray-400 mt-1">Category: {product.category}</p>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95">
            ✏️ Edit
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-xl shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95"
            onClick={() => handleDeleteProduct(product._id)}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
