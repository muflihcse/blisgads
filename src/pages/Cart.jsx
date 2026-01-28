import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { toast } from "react-toastify"
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi"

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    total,
  } = useCart()

  const navigate = useNavigate()

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <FiShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started</p>
          <button
            onClick={() => navigate("/shop")}
            className="border px-6 py-3 hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-3xl tracking-wider mb-8">SHOPPING CART</h1>
      <p className="text-gray-500 mb-8">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.id}-${item.selectedColor}-${idx}`}
              className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                {item.selectedColor && (
                  <p className="text-sm text-gray-500 mb-2">
                    Color: <span className="font-medium">{item.selectedColor}</span>
                  </p>
                )}
                {item.selectedModel && (
                  <p className="text-sm text-gray-500 mb-2">
                    Model: <span className="font-medium">{item.selectedModel}</span>
                  </p>
                )}
                <p className="text-lg font-semibold">₹{item.price}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => {
                    removeFromCart(item.id, item.selectedColor, item.selectedModel)
                    toast.success("Item removed from cart")
                  }}
                  className="text-red-500 hover:text-red-700 transition p-2"
                  title="Remove item"
                >
                  <FiTrash2 size={18} />
                </button>

                <div className="flex items-center gap-3 border rounded-lg">
                  <button
                    onClick={() => {
                      if (item.qty > 1) {
                        decreaseQty(item.id, item.selectedColor, item.selectedModel)
                        toast.info("Quantity updated")
                      }
                    }}
                    disabled={item.qty <= 1}
                    className="p-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus size={16} />
                  </button>

                  <span className="px-3 font-semibold min-w-[2rem] text-center">{item.qty}</span>

                  <button
                    onClick={() => {
                      increaseQty(item.id, item.selectedColor, item.selectedModel)
                      toast.success("Quantity updated")
                    }}
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>

                <p className="text-lg font-bold mt-2">
                  ₹{item.price * item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/checkout")
              }}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:opacity-90 transition mb-4"
            >
              PROCEED TO CHECKOUT
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="w-full border border-black text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
