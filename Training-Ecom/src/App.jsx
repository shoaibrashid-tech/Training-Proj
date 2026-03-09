import React, { useEffect } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Utils/authContext';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import getUserProfile from './Utils/AuthUtils';
import ProtectedRoute from './Utils/ProtectedRoute';
import CheckoutPage from './pages/CheckoutPage';
export default function App() {

  const navBarMenu = [
    {label: "Home", href: "/"},
    {label: "Cart", href: "/cart"},
    {label: "About Us", href:"/about"},
    {label: "Contanct Us", href: "/contact"},


  ]
  const {login, setLoading} = useContext(AuthContext);
  
  useEffect(() => {

  const loadUser = async () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const userData = await getUserProfile(token);
      if (userData) {
        login(userData);
      }
    }

    setLoading(false);
  };

  loadUser();

}, []);
  return (
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          
          <Navbar  menu={navBarMenu}/>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage/>} />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>} />
              
            </Routes>
          </main>

        </div>
    </BrowserRouter>

  )
}
