import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

export default function App() {

  const navBarMenu = [
    {label: "Home", href: "/"},
    {label: "Cart", href: "/cart"},
    {label: "About Us", href:"/about"},
    {label: "Contanct Us", href: "/contact"},

  ]
  return (
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          
          <Navbar  menu={navBarMenu}/>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage/>} />
              <Route path="/cart" element={<CartPage/>} />
            </Routes>
          </main>

        </div>
    </BrowserRouter>

  )
}
