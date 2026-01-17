import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

function ProductCard({ product, onOpen }) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [activeColor, setActiveColor] = useState(product.colors[0])

  // ✅ ACCESS CONTROL ONLY
  const handleAction = (action) => {
    if (!user) {
      toast.warning("Please login to add items to cart")
      return
    }
    action()
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      dealPrice: product.dealPrice,
      device: product.device,
      image: activeColor.image,
      selectedColor: activeColor.name,
      qty: 1,
    })

    // ✅ TOASTIFY ONLY (NO LOGIC CHANGE)
    toast.success("Item added to cart 🛒")
    toast.info("If item already exists, quantity increased ➕")

    navigate("/cart")
  }

  return (
    <div
      className="border rounded-lg p-4 bg-white cursor-pointer"
      onClick={() => onOpen(product)}
    >
      <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full mb-3">
        Save {product.discount}%
      </span>

      <img
        src={activeColor.image}
        alt={product.name}
        className="w-full h-[280px] object-contain"
      />

      <h3 className="mt-4 font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">For {product.device}</p>

      <div className="flex gap-2 mt-3">
        {product.colors.map((color) => (
          <button
            key={color.name}
            onClick={(e) => {
              e.stopPropagation()
              setActiveColor(color)

              // ✅ TOASTIFY FOR COLOR CHANGE
              toast.info(`Color changed to ${color.name}`)
            }}
            className={`w-5 h-5 rounded-full border ${
              activeColor.name === color.name ? "ring-2 ring-black" : ""
            }`}
            style={{ backgroundColor: color.code }}
          />
        ))}
      </div>

      <div className="mt-3">
        <span className="text-xl font-bold">₹{product.price}</span>
        <span className="ml-2 text-sm text-gray-400 line-through">
          ₹{product.mrp}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()

          

          handleAction(handleAddToCart)
        }}
        className="mt-4 w-full bg-black text-white py-3 rounded"
      >
        ADD TO CART
      </button>
    </div>
  )
}

export default ProductCard
