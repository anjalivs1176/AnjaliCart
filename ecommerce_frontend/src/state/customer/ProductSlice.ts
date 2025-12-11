import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/api"
import { Product } from "../../type/productType";

const API_URL = "/api/products";

export const fetchProductById = createAsyncThunk<any, any>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: { query },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        params: { ...params, pageNumber: params.pageNumber || 0 },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface ProductState{
    product : Product | null;
    products:Product[];
    totalPages:number;
    loading:boolean;
    error: string | null | undefined | any;
    searchProduct : Product[];
}

const initialState:ProductState={
    product : null,
    products:[],
    totalPages:1,
    loading:false,
    error: null,
    searchProduct : []
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProductById.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProductById.fulfilled, (state,action)=>{
            state.loading=false;
            state.product=action.payload;
        })
        .addCase(fetchProductById.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })



        .addCase(fetchAllProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.loading=false;
            state.products=action.payload.content;
        })
        .addCase(fetchAllProducts.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        .addCase(searchProduct.pending,(state)=>{
            state.loading=true;
        })
        .addCase(searchProduct.fulfilled, (state,action)=>{
            state.loading=false;
            state.searchProduct=action.payload;
        })
        .addCase(searchProduct.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        
    }
})

export default productSlice.reducer;