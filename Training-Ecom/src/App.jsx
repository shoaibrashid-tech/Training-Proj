import React, { useEffect, useContext, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ... all existing imports remain the same ...
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
import { strings } from './constants/strings';

const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AdminLayout = lazy(() => import('./components/Layouts/AdminLayout'));
const ProductAdmin = lazy(() => import('./pages/Admin/ProductAdmin'));

const DevTools = lazy(() => 
  import('@tanstack/react-query-devtools').then((module) => ({
    default: module.ReactQueryDevtools
  }))
);

// This component handles the language setup and renders the nested routes via Outlet
const LanguageWrapper = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = lang || 'en';
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [lang, i18n]);

  return <Outlet />;
};

export default function App() {
  const [showDevtools, setShowDevtools] = useState(false);
  const { login, setLoading } = useContext(AuthContext);
  const { t } = useTranslation();

  const navBarMenu = [
    { label: t(strings.home), href: "/" }, 
    { label: t(strings.cart), href: "/cart" }
  ];

  useEffect(() => {
    if (import.meta.env.MODE === 'development') setShowDevtools(true);
    
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if(token && token === import.meta.env.VITE_ADMIN_TOKEN){
          login({ id: "admin", email: "admin@admin.com", name: "Admin Account", role: "admin" });
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
        {/* We use two routes that point to the SAME structure to handle both / and /ur/ */}
        <Route path="/" element={<LanguageWrapper />}>
            {/* Defined Routes here so they match / */}
            {renderAppRoutes(navBarMenu)}
        </Route>

        <Route path="/:lang" element={<LanguageWrapper />}>
            {/* Defined Routes here so they match /ur/ */}
            {renderAppRoutes(navBarMenu)}
        </Route>
        
        {/* Catch-all for non-existent paths */}
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

// Helper function to keep code clean and avoid repetition
function renderAppRoutes(navBarMenu) {
  return (
    <>
      <Route element={<MainLayout menu={navBarMenu} />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="checkout" element={
          <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Loading /></div>}>
            <ProtectedRoute><CheckoutPage /></ProtectedRoute>
          </Suspense>
        } />
        <Route path="order-success" element={<OrderSuccess />} />
      </Route>

      <Route path="admin/*" element={
        <ProtectedRoute adminCheck={true}>
          <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Loading /></div>}>
            <AdminLayout />
          </Suspense>
        </ProtectedRoute>
      }>
        <Route index element={<> Admin Page</>} />
        <Route path="products" element={<ProductAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
}