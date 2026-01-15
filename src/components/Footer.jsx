import { Link } from "react-router-dom"
import { FiInstagram, FiMail, FiPhone } from "react-icons/fi"

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* -----------------brand----------------- */}
        <div>
          <h2 className="text-xl tracking-widest text-white">
            BLISZGADS
          </h2>
          <p className="text-gray-400 mt-4 text-sm">
            Premium iPhone cases designed for elegance, protection, and style.
          </p>
        </div>

        {/* -----------navigation----------- */}
        <div>
          <h3 className="text-white mb-4 tracking-wide">SHOP</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/*=----------------- account------------ */}
        <div>
          <h3 className="text-white mb-4 tracking-wide">ACCOUNT</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/*----------------- contact----------------- */}
        <div>
          <h3 className="text-white mb-4 tracking-wide">CONTACT</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <FiPhone /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FiMail /> support@bliszgads.com
            </li>
            <li className="flex items-center gap-2">
              <FiInstagram /> @bliszgads
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bliszgads. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
