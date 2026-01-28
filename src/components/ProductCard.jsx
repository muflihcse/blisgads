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
    // Determine default model (match ProductModal logic: last item in list)
    const defaultModel = product.iphoneModels
      ? product.iphoneModels[product.iphoneModels.length - 1]
      : product.device

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      dealPrice: product.dealPrice,
      device: product.device,
      image: activeColor.image,
      selectedColor: activeColor.name,
      selectedModel: defaultModel,
      stock: product.stock,
      qty: 1,
    })

    // ✅ TOASTIFY ONLY (NO LOGIC CHANGE)
    toast.success("Item added to cart")

    navigate("/cart")
  }

  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl p-3 cursor-pointer flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-black/5"
      onClick={() => onOpen(product)}
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 rounded-xl mb-3 overflow-hidden h-[300px] flex items-center justify-center p-6 group-hover:bg-gray-50 transition-colors">
        <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10 uppercase tracking-wider border border-black/5">
          Save {product.discount}%
        </span>

        <img
          src={activeColor.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col px-1">

        {/* Device Tag */}
        <p className="text-xs font-medium text-gray-500 mb-1">
          {product.device}
        </p>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-2 line-clamp-1 group-hover:text-black transition-colors">
          {product.name}
        </h3>

        {/* Colors */}
        <div className="flex gap-1.5 mb-4">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={(e) => {
                e.stopPropagation()
                setActiveColor(color)
              }}
              className={`w-5 h-5 rounded-full border border-gray-200 transition-all duration-200 ${activeColor.name === color.name
                ? "ring-1 ring-black scale-110"
                : "hover:scale-110"
                }`}
              style={{ backgroundColor: color.code }}
            />
          ))}
        </div>

        {/* Price & Stock Section */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-black">₹{product.price}</span>
            <span className="text-xs font-medium text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          </div>

          {/* Stock Warning (Height Preserved) */}
          {product.stock && product.stock < 5 ? (
            <p className="text-red-600 text-[10px] font-bold uppercase tracking-wide h-4 flex items-center gap-1">
              Only {product.stock} Left
            </p>
          ) : (
            <div className="h-4"></div>
          )}
        </div>
      </div>

      <button
        disabled={product.stock === 'NA' || product.stock <= 0}
        onClick={(e) => {
          e.stopPropagation()
          handleAction(handleAddToCart)
        }}
        className={`mt-3 w-full py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 ${product.stock === 'NA' || product.stock <= 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]"
          }`}
      >
        {product.stock === 'NA' || product.stock <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
      </button>
    </div>
  )
}

export default ProductCard
