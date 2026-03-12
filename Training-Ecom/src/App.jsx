import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Register from './pages/Register'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccess from './pages/OrderSuccess'


import ProductAdmin from './pages/Admin/ProductAdmin';

import { AuthContext } from './Utils/authContext'
import getUserProfile from './Utils/AuthUtils'
import ProtectedRoute from './Utils/ProtectedRoute'
import MainLayout from './components/Layouts/MainLayout';
import AdminLayout from './components/Layouts/AdminLayout';

import api from './api/axiosInstance';

import { ToastContainer } from 'react-toastify'

export default function App() {

  const navBarMenu = [
    {label: "Home", href: "/"},
    {label: "Cart", href: "/cart"},
    {label: "About Us", href:"/about"},
    {label: "Contanct Us", href: "/contact"},
  ]

  const { login, setLoading } = useContext(AuthContext);

  useEffect(() => {

    const loadUser = async () => {

      try {
        const token = localStorage.getItem("access_token");

        if (token) {
          const userData = await api.get("/auth/profile");

          if (userData?.data) {
            login(userData.data);
          }
        }

      } catch (error) {
        console.error("Failed to load user:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }

    };

    loadUser();

  }, []);

  return (

    <BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>


        <Route element={<MainLayout menu={navBarMenu} />}>

          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />

        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<> Admin Page</>} />
          <Route path="/admin/products" element={<ProductAdmin/>} />
        </Route>

      </Routes>

    </BrowserRouter>

  )
}