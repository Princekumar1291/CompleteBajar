import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  errorMessages: [],
}

export const fetchCustomerProducts = createAsyncThunk(
  "customer/fetchCustomerProducts",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(
      "http://localhost:4002/api/customer/products",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (response.status == 200) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error("Something went wrong while fetching products");
    }
  }
)

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCustomerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchCustomerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessages = [action.error.message];
      });
  }
})

export default customerSlice
export const { } = customerSlice.actions
