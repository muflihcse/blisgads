import { FiX, FiHeart } from "react-icons/fi"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { toast } from "react-toastify"

function ProductModal({ product, onClose }) {
  if (!product) return null

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const colors = product.colors ?? []
  const iphoneModels = product.iphoneModels ?? [
    "iPhone 13 Pro",
    "iPhone 13 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
  ]

  const [activeColor, setActiveColor] = useState(colors[0])
  const [selectedModel, setSelectedModel] = useState(
    iphoneModels[iphoneModels.length - 1]
  )
  const [qty, setQty] = useState(1)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      image: activeColor?.image,
      selectedColor: activeColor?.name,
      selectedModel,
      qty,
    })

    toast.success("Item added to cart 🛒")
    toast.info("If item exists, quantity updated")

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[95%] max-w-6xl grid grid-cols-2 rounded-xl shadow-xl relative overflow-hidden">

        <div className="absolute top-5 right-5 flex gap-4 z-10">
          <button
            onClick={() => {
              toggleWishlist(product)
              isInWishlist(product.id)
                ? toast.info("Removed from wishlist 💔")
                : toast.success("Added to wishlist ❤️")
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiHeart
              size={20}
              className={
                isInWishlist(product.id)
                  ? "text-black fill-black"
                  : "text-gray-400"
              }
            />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* image */}
        <div className="bg-gray-50 p-14 flex items-center justify-center">
          <img
            src={activeColor?.image}
            alt={product.name}
            className="max-h-[520px] object-contain"
          />
        </div>

        {/* contents */}
        <div className="p-12 overflow-y-auto">
          <h1 className="text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Compatible with {selectedModel}
          </p>

          <div className="mt-4 text-sm text-gray-600">
            {product.reviews} customer reviews
          </div>

          {/* price */}
          <div className="mt-6 flex items-end gap-4">
            <span className="text-4xl font-semibold">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through">
              ₹{product.mrp}
            </span>
            <span className="text-xs border px-3 py-1 rounded-full">
              Save {product.discount}%
            </span>
          </div>

          {/* features */}
          <div className="grid grid-cols-2 gap-3 mt-8 text-sm text-gray-700">
            <div>MagSafe compatible</div>
            <div>Anti-skid grip</div>
            <div>Drop protection</div>
            <div>Lifetime warranty</div>
          </div>

          {/* model */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-2">Select model</p>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
            >
              {iphoneModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* colour */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-3">
              Colour: <span className="text-gray-500">{activeColor?.name}</span>
            </p>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setActiveColor(color)
                    toast.info(`Colour changed to ${color.name}`)
                  }}
                  className={`w-9 h-9 rounded-full border transition ${
                    activeColor?.name === color.name
                      ? "ring-2 ring-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.code }}
                />
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (qty > 1) {
                    toast.info("Quantity decreased ➖")
                    setQty(qty - 1)
                  }
                }}
                className="w-9 h-9 border rounded hover:bg-gray-100 transition"
              >
                −
              </button>

              <span className="text-base font-medium">{qty}</span>

              <button
                onClick={() => {
                  setQty((q) => q + 1)
                  toast.success("Quantity increased ➕")
                }}
                className="w-9 h-9 border rounded hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-10 w-full bg-black text-white py-4 rounded-full text-sm tracking-wide hover:opacity-90 transition"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
