import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Register from './pages/Register'

import OrderSuccess from './pages/OrderSuccess'

import Loading from './components/Loading';

import { AuthContext } from './Utils/authContext'

import ProtectedRoute from './Utils/ProtectedRoute'
import MainLayout from './components/Layouts/MainLayout';


import api from './api/axiosInstance';

import { ToastContainer } from 'react-toastify'

import NotFound from './pages/404';

const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

const AdminLayout = lazy(() => import('./components/Layouts/AdminLayout'));
const ProductAdmin = lazy(() => import('./pages/Admin/ProductAdmin'));

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
        // ---------------- Hard Coded ------------------
        if(token && token === import.meta.env.VITE_ADMIN_TOKEN){
          login(
            {
              "id": "admin",
              "email": "admin@admin.com",
              "password": "admin",
              "name": "Admin Account",
              "role": "admin",
              "avatar": "https://i.pravatar.cc/300",
              "creationAt": "2026-03-12T09:25:50.000Z",
              "updatedAt": "2026-03-12T09:25:50.000Z"
            }
          )
          return;
        }
        //-------------End Hard Code---------------------

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
              <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">
                                  <Loading />
                                </div>}>
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />

        </Route>

        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute adminCheck={true} >
              <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">
                                    <Loading />
                                  </div>}>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<> Admin Page</>} />
          <Route path="products" element={<ProductAdmin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>

  )
}