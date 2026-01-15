import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import FeaturesStrip from "./components/FeaturesStrip"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import ProtectedRoute from "./components/ProtectedRoute"
import ScrollToTop from "./components/ScrollToTop"
import OrderSummary from "./pages/OrdersSummary"
import OrderDetails from "./pages/OrderDetails"
import { useRef } from "react"

import { Toast } from 'primereact/toast'
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"
import { ToastContainer } from "react-toastify"

function App() {
  const toast = useRef(null)


  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrderSummary /></PrivateRoute>} />
        <Route path="/orders/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>

      <FeaturesStrip />
      <Footer />

    </BrowserRouter>
  )
}

export default App
