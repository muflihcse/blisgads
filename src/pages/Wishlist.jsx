import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { RiDeleteBin6Line } from "react-icons/ri"
import { toast } from "react-toastify"

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Your wishlist is empty
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16 space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          YOUR WISHLIST
        </h1>
        <p className="text-gray-500 text-lg">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map(product => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300"
          >

            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
              <img
                src={product.colors[0].image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>

              {/* Remove Button */}
              <button
                onClick={() => {
                  toggleWishlist(product)
                  toast.info("Removed from wishlist")
                }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 z-10"
                title="Remove from Wishlist"
              >
                <RiDeleteBin6Line size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate px-2">{product.name}</h3>
                <p className="text-gray-500 font-medium">₹{product.price}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={product.stock === 'NA' || product.stock <= 0}
                onClick={() => {
                  addToCart({
                    ...product,
                    image: product.colors[0].image,
                    selectedColor: product.colors[0].name,
                    qty: 1
                  })
                  toggleWishlist(product)
                  toast.success("Moved to cart")
                }}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-gray-200 ${product.stock === 'NA' || product.stock <= 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {product.stock === 'NA' || product.stock <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
