// // import { useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { useCart } from "../context/CartContext"
// // import { useAuth } from "../context/AuthContext"
// // import api from "../api/apiContext"

// // function Checkout() {
// //   const navigate = useNavigate()
// //   const { cart, clearCart } = useCart()
// //   const { user } = useAuth()

// //   const [address, setAddress] = useState({
// //     fullName: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     pincode: ""
// //   })

// //   const [error, setError] = useState("")

// //   const total = cart.reduce(
// //     (sum, item) => sum + item.price * item.qty,
// //     0
// //   )

// //   if (cart.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-gray-400">
// //         Your cart is empty
// //       </div>
// //     )
// //   }

// //   const handleChange = (e) => {
// //     setAddress({ ...address, [e.target.name]: e.target.value })
// //   }

// //   const handlePlaceOrder = async () => {
// //     setError("")

// //     const { fullName, phone, address: addr, city, pincode } = address

// //     if (!fullName || !phone || !addr || !city || !pincode) {
// //       setError("Please fill all shipping details")
// //       return
// //     }

// //     if (!/^\d{10}$/.test(phone)) {
// //       setError("Invalid phone number")
// //       return
// //     }

// //     if (!/^\d{6}$/.test(pincode)) {
// //       setError("Invalid pincode")
// //       return
// //     }

// //     const newOrder = {
// //       id: `ORD-${Date.now()}`,
// //       userId: user.id,
// //       items: cart,
// //       shippingAddress: address,
// //       paymentMethod: "Cash on Delivery",
// //       total,
// //       status: "Placed",
// //       createdAt: new Date().toISOString()
// //     }

// //     await api.post("/orders", newOrder)

   
// //     await api.patch(`/users/${user.id}`, {
// //       shipping: address
// //     })
// //     clearCart()
// //     alert("Order placed successfully!")
// //     navigate("/orders")
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto px-6 py-20">
// //       <h1 className="text-3xl mb-10">CHECKOUT</h1>

// //       <div className="grid md:grid-cols-2 gap-16">
       
// //         <div>
// //           <h2 className="text-xl mb-6">Shipping Address</h2>

// //           {["fullName", "phone", "address", "city", "pincode"].map((field) => (
// //             <input
// //               key={field}
// //               name={field}
// //               placeholder={field.toUpperCase()}
// //               value={address[field]}
// //               onChange={handleChange}
// //               className="w-full mb-4 px-4 py-3 border rounded"
// //             />
// //           ))}

// //           {error && <p className="text-red-500">{error}</p>}
// //         </div>

        
// //         <div>
// //           <h2 className="text-xl mb-6">Order Summary</h2>

// //           <div className="border rounded p-6">
// //             {cart.map(item => (
// //               <div key={item.id} className="flex justify-between py-2">
// //                 <span>{item.name} × {item.qty}</span>
// //                 <span>₹{item.price * item.qty}</span>
// //               </div>
// //             ))}

// //             <div className="flex justify-between border-t pt-4 mt-4 font-bold">
// //               <span>Total</span>
// //               <span>₹{total}</span>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handlePlaceOrder}
// //             className="w-full bg-black text-white py-4 mt-6 rounded"
// //           >
// //             PLACE ORDER
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Checkout


// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useCart } from "../context/CartContext"
// import { useAuth } from "../context/AuthContext"
// import api from "../api/apiContext"

// function Checkout() {
//   const navigate = useNavigate()
//   const { cart, clearCart } = useCart()
//   const { user } = useAuth()

//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: ""
//   })

//   const [error, setError] = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   )

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Your cart is empty
//       </div>
//     )
//   }

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value })
//   }

//   const handlePlaceOrder = async () => {
//     setError("")

//     const { fullName, phone, address: addr, city, pincode } = address

//     if (!fullName || !phone || !addr || !city || !pincode) {
//       setError("Please fill all shipping details")
//       return
//     }

//     if (!/^\d{10}$/.test(phone)) {
//       setError("Invalid phone number")
//       return
//     }

//     if (!/^\d{6}$/.test(pincode)) {
//       setError("Invalid pincode")
//       return
//     }

//     const newOrder = {
//       id: `ORD-${Date.now()}`,
//       userId: user.id,
//       items: cart,
//       shippingAddress: address,
//       paymentMethod,
//       total,
//       status: "Placed",
//       createdAt: new Date().toISOString()
//     }

//     await api.post("/orders", newOrder)

//     await api.patch(`/users/${user.id}`, {
//       shipping: address
//     })

//     clearCart()
//     alert("Order placed successfully!")
//     navigate("/orders")
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-20">
//       <h1 className="text-3xl mb-10">CHECKOUT</h1>

//       <div className="grid md:grid-cols-2 gap-16">

//         {/* SHIPPING */}
//         <div>
//           <h2 className="text-xl mb-6">Shipping Address</h2>

//           {["fullName", "phone", "address", "city", "pincode"].map((field) => (
//             <input
//               key={field}
//               name={field}
//               placeholder={field.toUpperCase()}
//               value={address[field]}
//               onChange={handleChange}
//               className="w-full mb-4 px-4 py-3 border rounded"
//             />
//           ))}

//           {error && <p className="text-red-500">{error}</p>}
//         </div>

//         {/* SUMMARY + PAYMENT */}
//         <div>
//           <h2 className="text-xl mb-6">Order Summary</h2>

//           <div className="border rounded p-6">
//             {cart.map(item => (
//               <div key={item.id} className="flex justify-between py-2">
//                 <span>{item.name} × {item.qty}</span>
//                 <span>₹{item.price * item.qty}</span>
//               </div>
//             ))}

//             <div className="flex justify-between border-t pt-4 mt-4 font-bold">
//               <span>Total</span>
//               <span>₹{total}</span>
//             </div>
//           </div>

//           {/* PAYMENT METHOD */}
//           <div className="mt-8">
//             <h3 className="text-lg mb-4">Payment Method</h3>

//             <label className="flex items-center gap-3 mb-3">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="Cash on Delivery"
//                 checked={paymentMethod === "Cash on Delivery"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               Cash on Delivery
//             </label>

//             <label className="flex items-center gap-3 mb-3">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="UPI"
//                 checked={paymentMethod === "UPI"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               UPI
//             </label>

//             <label className="flex items-center gap-3">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="Card"
//                 checked={paymentMethod === "Card"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               Card
//             </label>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full bg-black text-white py-4 mt-8 rounded"
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Checkout

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
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")

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
      paymentMethod,
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

        {/* SHIPPING */}
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

        {/* SUMMARY + PAYMENT */}
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

          {/* PREMIUM PAYMENT SECTION */}
          <div className="mt-10">
            <h3 className="text-lg font-medium mb-5">Payment Method</h3>

            <div className="space-y-4">

              {/* COD */}
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition
                ${
                  paymentMethod === "Cash on Delivery"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black"
                  />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">
                      Pay when the product arrives
                    </p>
                  </div>
                </div>
              </label>

              {/* UPI */}
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition
                ${
                  paymentMethod === "UPI"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black"
                  />
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-gray-500">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </div>
              </label>

              {/* CARD */}
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition
                ${
                  paymentMethod === "Card"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black"
                  />
                  <div>
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">
                      Visa, Mastercard, RuPay supported
                    </p>
                  </div>
                </div>
              </label>

            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-4 mt-10 rounded"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
