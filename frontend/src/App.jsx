import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./pages/Footer";
import SignUp from "./pages/SignUp";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Seller";
import Product from "./pages/Product";
import FeedbackForm from "./pages/FeedbackForm";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import AdminPanel from "./pages/AdminPanel";
import Products from "./pages/Products";
import ErrorBoundary from "./components/ErrorBoundary";
import BuyNow from "./pages/BuyNow";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import Kyc from "./components/kyc/Kyc";
import PayNow from "./pages/PayNow.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";
import {Toaster} from "sonner";


const App = () => {
  // Routes where Navbar and Footer should be hidden
  const hiddenNavbarRoutes = [
    "/login",
    "/signup",
    "/buyer/*",
    "/seller/*",
    "/products",
    "/buyer/payments",
    "/logistics",
    "/feedback",
    "/settings",
    "/help",
    "/admin",
    "/kyc",
    "/pay-now",
    "/paymet-success",
    "/paymet-failure",
    "/product/:id"
  ];

  return (
    <Router>
      <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" richColors closeButton/>
        {/* Navbar will show on all pages except specified routes */}
        <Routes>
          {hiddenNavbarRoutes.map((path) => (
            <Route key={path} path={path} element={null} />
          ))}
          <Route path="*" element={<Navbar />} />
        </Routes>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/kyc" element={<Kyc />} />
            <Route
              path="/product/:id"
              element={
                <ErrorBoundary>
                  <Product />
                </ErrorBoundary>
              }
            />
            <Route
              path="/products"
              element={
                <ErrorBoundary>
                  <Products />
                </ErrorBoundary>
              }
            />

            {/* Buyer Routes */}
            <Route path="/buyer/dashboard" element={<Buyer />} />

            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={<Seller />} />
            {/* <Route path="/seller/products" element={<SellerProducts />} />
            <Route path="/seller/payments" element={<Payments />} />
            <Route path="/seller/logistics" element={<SellerLogistics />} />
            <Route path="/seller/analytics" element={<SellerAnalytics />} />
            <Route path="/seller/compliance" element={<ComplianceManager />} />
            
             */}
            {/* <Route path="/seller/profile" element={<SellerProfile />} /> */}
            {/* Shared Routes */}
            {/* <Route path="/logistics" element={<Logistics />} /> */}
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pay-now" element={<PayNow/>}></Route>
            <Route path="/payment-success" element={<PaymentSuccess/>}></Route>
            <Route path="/pay-failure" element={<PaymentFailure/>}></Route>

            {/* Add Help Center Route */}
            <Route path="/help" element={<HelpCenter />} />

            {/* Admin Route */}
            <Route path="/admin" element={<AdminPanel />} />

            {/* Error Pages */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route
              path="/product/:id/buy"
              element={
                <ErrorBoundary>
                  <BuyNow />
                </ErrorBoundary>
              }
            />
            <Route
              path="/buy-now/:id"
              element={
                <ErrorBoundary>
                  <BuyNow />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<NotFound />} />

            {/* Add more routes here */}
          </Routes>
        </main>

        {/* Footer will show on all pages except specified routes */}
        <Routes>
          {hiddenNavbarRoutes.map((path) => (
            <Route key={path} path={path} element={null} />
          ))}
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
