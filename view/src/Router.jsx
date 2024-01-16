import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/app/App";
import Category from "./components/app/pages/Category";
import Error from "./components/app/pages/Error";
import Home from "./components/app/pages/Home";
import Product from "./components/app/pages/Product";
import Products from "./components/app/pages/Products";
import Login from "./components/app/pages/auth/Login";
import Register from "./components/app/pages/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Stats from "./components/dashboard/pages/Stats";
import { checkAuth } from "./store/slices/authSlice";

function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="category/:id" element={<Category />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Stats />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
