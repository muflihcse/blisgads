import { Link, useNavigate } from "react-router-dom"
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiX,
  FiMenu,
} from "react-icons/fi"
import { useState } from "react"

import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()
  

  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const [mobileMenu, setMobileMenu] = useState(false)

  //  ----------cart-----------
  const totalQty = cart.reduce(
    (sum, item) => sum + Number(item.qty ?? 1),
    0
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/shop?search=${query}`)
    setQuery("")
    setShowSearch(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
    setMobileMenu(false)
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white text-black relative">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* ----------logo------ */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          <img src="./assets/Logo.png" alt="" className="h-70 w-auto object-contain"/>
        </Link>

        {/* ========menu=========== */}
       {user &&  <div className="hidden md:flex gap-8 text-sm">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/orders">Orders</Link>
        </div>}

        {/*-----------icons------------ */}
        <div className="flex items-center gap-5">

          {/* ----------search------ */}
          <button onClick={() => setShowSearch(true)}>
            <FiSearch size={18} />
          </button>

          {/*========== user======== */}
          {!user ? (
            <Link to="/login">
              <FiUser size={18} />
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-xs">
              Logout
            </button>
          )}

          {/* ==========wishlist=========== */}
          {user && <Link to="/wishlist" className="relative">
            <FiHeart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>}

          {/* -------------cart----------- */}
          {user && <Link to="/cart" className="relative">
            <FiShoppingCart size={18} />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>}

          {/* --------menu icons------ */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/*-------mobile menu------- */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 text-sm">
          <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMobileMenu(false)}>Shop</Link>
          <Link to="/orders" onClick={() => setMobileMenu(false)}>Orders</Link>

          {!user ? (
            <Link to="/login" onClick={() => setMobileMenu(false)}>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-left">
              Logout
            </button>
          )}
        </div>
      )}

      {/* ----------search-------- */}
      {showSearch && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center px-6">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-xl border-b border-black"
          >
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 py-3 outline-none"
            />
            <button type="submit" className="mr-4">
              <FiSearch />
            </button>
            <button type="button" onClick={() => setShowSearch(false)}>
              <FiX />
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}

export default Navbar
