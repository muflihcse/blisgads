import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import api from "../api/apiContext"

function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { user } = useAuth()

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  })

  const [error, setError] = useState("")

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Your cart is empty
      </div>
    )
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    setError("")

    const { fullName, phone, address: addr, city, pincode } = address

    if (!fullName || !phone || !addr || !city || !pincode) {
      setError("Please fill all shipping details")
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Invalid phone number")
      return
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Invalid pincode")
      return
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: cart,
      shippingAddress: address,
      paymentMethod: "Cash on Delivery",
      total,
      status: "Placed",
      createdAt: new Date().toISOString()
    }

    await api.post("/orders", newOrder)

   
    await api.patch(`/users/${user.id}`, {
      shipping: address
    })
    clearCart()
    alert("Order placed successfully!")
    navigate("/orders")
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl mb-10">CHECKOUT</h1>

      <div className="grid md:grid-cols-2 gap-16">
       
        <div>
          <h2 className="text-xl mb-6">Shipping Address</h2>

          {["fullName", "phone", "address", "city", "pincode"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.toUpperCase()}
              value={address[field]}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border rounded"
            />
          ))}

          {error && <p className="text-red-500">{error}</p>}
        </div>

        
        <div>
          <h2 className="text-xl mb-6">Order Summary</h2>

          <div className="border rounded p-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between py-2">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <div className="flex justify-between border-t pt-4 mt-4 font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-4 mt-6 rounded"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
