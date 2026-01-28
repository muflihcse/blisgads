// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar"
// import FeaturesStrip from "./components/FeaturesStrip"
// import Footer from "./components/Footer"

// import Home from "./pages/Home"
// import Shop from "./pages/Shop"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Cart from "./pages/Cart"
// import Wishlist from "./pages/Wishlist"
// import Checkout from "./pages/Checkout"
// import ProtectedRoute from "./components/ProtectedRoute"
// import ScrollToTop from "./components/ScrollToTop"
// import OrderSummary from "./pages/OrdersSummary"
// import OrderDetails from "./pages/OrderDetails"
// import { useRef } from "react"

// import { Toast } from 'primereact/toast'
// import PublicRoute from "./components/PublicRoute"
// import PrivateRoute from "./components/PrivateRoute"
// import { ToastContainer } from "react-toastify"

// function App() {
//   const toast = useRef(null)


//   return (
//     <BrowserRouter>
//     <ToastContainer position="top-right" autoClose={3000} />
//     <ScrollToTop/>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
//         <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
//         <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
//         <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
//         <Route path="/orders" element={<PrivateRoute><OrderSummary /></PrivateRoute>} />
//         <Route path="/orders/:id" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       <FeaturesStrip />
//       <Footer />

//     </BrowserRouter>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
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
import ScrollToTop from "./components/ScrollToTop"
import OrderSummary from "./pages/OrdersSummary"
import OrderDetails from "./pages/OrderDetails"

import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRef } from "react"

// Admin Imports
import AdminLayout from "./admin/component/AdminLayout"
import AdminDashboard from "./admin/pages/Dashboard"
import AdminProducts from "./admin/pages/Products"
import AdminOrders from "./admin/pages/Orders"
import AdminUsers from "./admin/pages/Users"
import AdminBanners from "./admin/pages/Banners"
import AdminCoupons from "./admin/pages/Coupons"
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute"

// Component to conditionally render Navbar/Footer
function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {/* Only show Navbar for non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* PROTECTED */}
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderSummary />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="coupons" element={<AdminCoupons />} />
          </Route>
        </Route>
      </Routes>

      {/* Only show Footer and FeaturesStrip for non-admin routes */}
      {!isAdminRoute && (
        <>
          <FeaturesStrip />
          <Footer />
        </>
      )}
    </>
  )
}

function App() {
  const toast = useRef(null)

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

export default App
