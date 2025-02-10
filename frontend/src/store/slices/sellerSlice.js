import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  errorMessages: []
}

export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(
      "http://localhost:4002/api/seller/products",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    if(response.status == 200){
      const data = await response.json();
      return data;
    }
    else{
      throw new Error("Something went wrong while fetching products");
    }
  }
)

const sellerSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessages = [action.error.message];
      });
  }
});

export const { addProduct, deleteProduct } = sellerSlice.actions; 

export default sellerSlice.reducer;
