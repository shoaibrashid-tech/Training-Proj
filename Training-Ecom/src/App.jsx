import React, { useEffect, useContext, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ... all your existing imports ...
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderSuccess from './pages/OrderSuccess';
import Loading from './components/Loading';
import { AuthContext } from './Utils/authContext';
import ProtectedRoute from './Utils/ProtectedRoute';
import MainLayout from './components/Layouts/MainLayout';
import api from './api/axiosInstance';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/404';

const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AdminLayout = lazy(() => import('./components/Layouts/AdminLayout'));
const ProductAdmin = lazy(() => import('./pages/Admin/ProductAdmin'));

// DevTools Wrapper: Lazy loaded only in development
const DevTools = lazy(() => 
  import('@tanstack/react-query-devtools').then((module) => ({
    default: module.ReactQueryDevtools
  }))
);

export default function App() {
  const [showDevtools, setShowDevtools] = useState(false);
  const navBarMenu = [{label: "Home", href: "/"}, {label: "Cart", href: "/cart"}];
  const { login, setLoading } = useContext(AuthContext);

  useEffect(() => {
    
    if (import.meta.env.MODE === 'development') {
      setShowDevtools(true);
    }

    const loadUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if(token && token === import.meta.env.VITE_ADMIN_TOKEN){
          login({
            "id": "admin",
            "email": "admin@admin.com",
            "name": "Admin Account",
            "role": "admin",
          });
          return;
        }
        if (token) {
          const userData = await api.get("/auth/profile");
          if (userData?.data) login(userData.data);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} newestOnTop closeOnClick pauseOnHover />

      <Routes>
        <Route element={<MainLayout menu={navBarMenu} />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute><CheckoutPage /></ProtectedRoute>
            </Suspense>
          } />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        <Route path="/admin/*" element={
          <ProtectedRoute adminCheck={true}>
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        }>
          <Route index element={<> Admin Page</>} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showDevtools && (
        <Suspense fallback={null}>
          <DevTools initialIsOpen={false} />
        </Suspense>
      )}
    </BrowserRouter>
  );
}