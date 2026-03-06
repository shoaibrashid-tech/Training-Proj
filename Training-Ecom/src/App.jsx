import React from 'react'
import ProductPage from './pages/ProductPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ProductPage />} />
              <Route path="/test" element={<div>Hello</div>} />
            </Routes>
          </main>

        </div>
    </BrowserRouter>

  )
}
