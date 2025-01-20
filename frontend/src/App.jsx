import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Footer from './pages/Footer'
import SignUp from './pages/SignUp'
import Buyer from './pages/Buyer'
import Seller from './pages/Seller'
import Product from './pages/Product'
import SellerProducts from './pages/SellerProducts'
import Payments from './pages/Payments'
import BuyerPayments from './pages/BuyerPayments'
import Logistics from './pages/Logistics'
import SellerLogistics from './pages/SellerLogistics'
import BuyerAnalytics from './pages/BuyerAnalytics'
import SellerAnalytics from './pages/SellerAnalytics'
import ComplianceManager from './pages/ComplianceManager'
import BuyerProfile from './pages/BuyerProfile'
import SellerProfile from './pages/SellerProfile'
import FeedbackForm from './pages/FeedbackForm'
import Settings from './pages/Settings'
import HelpCenter from './pages/HelpCenter'
import NotFound from './pages/NotFound'
import AccessDenied from './pages/AccessDenied'
import AdminPanel from './pages/AdminPanel'
import Products from './pages/Products'
import ErrorBoundary from './components/ErrorBoundary'
import BuyNow from './pages/BuyNow'

const App = () => {
  // Routes where Navbar and Footer should be hidden
  const hiddenNavbarRoutes = [
    '/login',
    '/signup',
    '/buyer/dashboard',
    '/buyer/analytics',
    '/buyer/compliance',
    '/buyer/profile',
    '/seller/dashboard',
    '/seller/products',
    '/seller/payments',
    '/seller/analytics',
    '/seller/compliance',
    '/seller/profile',
    '/buyer/payments',
    '/logistics',
    '/seller/logistics',
    '/feedback',
    '/settings',
    '/help',
    '/admin'
  ]

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar will show on all pages except specified routes */}
        <Routes>
          {hiddenNavbarRoutes.map(path => (
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
            <Route path="/product/:id" element={
              <ErrorBoundary>
                <Product />
              </ErrorBoundary>
            } />
            <Route path="/products" element={
              <ErrorBoundary>
                <Products />
              </ErrorBoundary>
            } />
            
            {/* Buyer Routes */}
            <Route path="/buyer/dashboard" element={<Buyer />} />
            {/* <Route path="/buyer/payments" element={<BuyerPayments />} />
            <Route path="/buyer/analytics" element={<BuyerAnalytics />} />
            <Route path="/buyer/compliance" element={<ComplianceManager />} />
            <Route path="/buyer/profile" element={<BuyerProfile />} /> */}
            
            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={<Seller />} />
            {/* <Route path="/seller/products" element={<SellerProducts />} />
            <Route path="/seller/payments" element={<Payments />} />
            <Route path="/seller/logistics" element={<SellerLogistics />} />
            <Route path="/seller/analytics" element={<SellerAnalytics />} />
            <Route path="/seller/compliance" element={<ComplianceManager />} />
            <Route path="/seller/profile" element={<SellerProfile />} />
             */}
            {/* Shared Routes */}
            {/* <Route path="/logistics" element={<Logistics />} /> */}
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Add Help Center Route */}
            <Route path="/help" element={<HelpCenter />} />
            
            {/* Admin Route */}
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Error Pages */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/product/:id/buy" element={
              <ErrorBoundary>
                <BuyNow />
              </ErrorBoundary>
            } />
            <Route path="*" element={<NotFound />} />
            
            {/* Add more routes here */}
          </Routes>
        </main>

        {/* Footer will show on all pages except specified routes */}
        <Routes>
          {hiddenNavbarRoutes.map(path => (
            <Route key={path} path={path} element={null} />
          ))}
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
