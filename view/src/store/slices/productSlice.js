import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  productImages: [],
  categories: [],
  category: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await fetch("/api/v1/products/get");
  return await response.json();
});

export const getProduct = createAsyncThunk("products/getProduct", async (id) => {
  const response = await fetch(`/api/v1/products/get/${id}`);
  return await response.json();
});

export const getProductImages = createAsyncThunk("products/getProductImages", async (id) => {
  const response = await fetch(`/api/v1/products/getProductImages/${id}`);
  return await response.json();
});

export const getProductsByCategory = createAsyncThunk("products/getProductsByCategory", async (id) => {
  const response = await fetch(`/api/v1/products/getProductsByCategory/${id}`);
  return await response.json();
});

export const getRandomProducts = createAsyncThunk("products/getRandomProducts", async () => {
  const response = await fetch("/api/v1/products/get");
  const data = await response.json();
  const result = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    if (!result.includes(data[randomIndex])) {
      result.push(data[randomIndex]);
    } else {
      i--;
    }
  }
  return result;
});

export const getCategories = createAsyncThunk("products/getCategories", async () => {
  const response = await fetch("/api/v1/categories/get");
  return await response.json();
});

export const getCategory = createAsyncThunk("products/getCategory", async (id) => {
  const response = await fetch(`/api/v1/categories/get/${id}`);
  return await response.json();
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductImages.fulfilled, (state, action) => {
        state.loading = false;
        state.productImages = action.payload;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getRandomProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        }
      );
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
