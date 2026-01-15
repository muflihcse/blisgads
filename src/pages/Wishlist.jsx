import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { RiDeleteBin6Line } from "react-icons/ri"

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
      <h1 className="text-3xl tracking-wider mb-10">
        WISHLIST
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {wishlist.map(product => (
          <div key={product.id} className="relative group border border-gray-400 p-2 rounded-md">

            {/* ❌ REMOVE ICON */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-3 right-3 bg-red-100 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition text-red-500"
            >
              <RiDeleteBin6Line size={20} />
            </button>

            <img
              src={product.colors[0].image}
              alt={product.name}
              className="h-[350px] w-full object-cover"
            />

            <h3 className="mt-4">{product.name}</h3>
            <p className="text-gray-400 mb-3">₹{product.price}</p>

            {/* 🛒 ADD TO CART */}
            <button
              onClick={() => {

                addToCart({
                  ...product,
                  image: product.colors[0].image,
                  selectedColor: product.colors[0].name,
                  qty: 1
                })

                 toggleWishlist(product)
              }
              }
              className="w-full border border-gray-400 py-2 text-sm bg-black text-white rounded-2xl"
            >
              ADD TO CART
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
