import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { toast } from "react-toastify"

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    total,
  } = useCart()

  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-2xl">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24">
      <h1 className="text-3xl mb-8">CART</h1>

      {cart.map((item) => (
        <div
          key={`${item.id}-${item.selectedColor}`}
          className="flex justify-between items-center border-b py-6"
        >
          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-contain"
            />

            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Color: {item.selectedColor}
              </p>
              <p className="text-gray-500">₹{item.price}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                decreaseQty(item.id, item.selectedColor)
                toast.info("Quantity decreased")
              }}
              className="px-3 text-xl"
            >
              -
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() => {
                increaseQty(item.id, item.selectedColor)
                toast.success("Quantity increased")
              }}
              className="px-3 text-xl"
            >
              +
            </button>

            <button
              onClick={() => {
                removeFromCart(item.id, item.selectedColor)
                toast.error("Item removed from cart")
              }}
              className="text-red-500 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-xl font-semibold">
          Total: ₹{total}
        </h2>

        <button
          onClick={() => {
            toast.success("Proceeding to checkout")
            navigate("/checkout")
          }}
          className="border px-6 py-3 hover:bg-black hover:text-white transition"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  )
}

export default Cart
