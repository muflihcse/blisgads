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

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import api from "../api/apiContext"
import { toast } from "react-toastify"
import { FiTag, FiCheck, FiX, FiUser, FiSmartphone, FiMapPin, FiCreditCard, FiTruck, FiBox } from "react-icons/fi"

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
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState("")
  const [coupons, setCoupons] = useState([])
  const [loadingCoupons, setLoadingCoupons] = useState(false)

  // Load saved address if available
  useEffect(() => {
    if (user?.shipping) {
      setAddress(user.shipping)
    }
  }, [user])

  // Fetch available coupons
  useEffect(() => {
    api.get("/coupons")
      .then(res => {
        const activeCoupons = res.data.filter(c => c.active && new Date(c.expiryDate) > new Date())
        setCoupons(activeCoupons)
      })
      .catch(err => console.error("Coupon fetch error:", err))
  }, [])

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const calculateDiscount = () => {
    if (!appliedCoupon || subtotal < appliedCoupon.minAmount) return 0

    if (appliedCoupon.discountType === "percentage") {
      const discount = (subtotal * appliedCoupon.discountAmount) / 100
      return appliedCoupon.maxDiscount
        ? Math.min(discount, appliedCoupon.maxDiscount)
        : discount
    } else {
      return appliedCoupon.discountAmount
    }
  }

  const discount = calculateDiscount()
  const total = subtotal - discount

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/shop")}
            className="border px-6 py-2 hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleApplyCoupon = async () => {
    setCouponError("")
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }

    setLoadingCoupons(true)
    try {
      const res = await api.get(`/coupons?code=${couponCode.toUpperCase()}`)
      const coupon = res.data[0]

      if (!coupon) {
        setCouponError("Invalid coupon code")
        return
      }

      if (!coupon.active) {
        setCouponError("This coupon is inactive")
        return
      }

      if (new Date(coupon.expiryDate) < new Date()) {
        setCouponError("This coupon has expired")
        return
      }

      if (subtotal < coupon.minAmount) {
        setCouponError(`Minimum order amount is ₹${coupon.minAmount}`)
        return
      }

      // Check Usage Limit
      if (user?.id) {
        const ordersRes = await api.get(`/orders?userId=${user.id}`);
        const previousUsage = ordersRes.data.filter(order => order.couponCode === coupon.code).length;
        const limit = coupon.usageLimitPerUser || 1;

        if (previousUsage >= limit) {
          setCouponError(`You have already used this coupon ${previousUsage} times (Limit: ${limit})`);
          return;
        }
      }

      setAppliedCoupon(coupon)
      setCouponCode("")
      toast.success("Coupon applied successfully!")
    } catch (err) {
      setCouponError("Failed to apply coupon")
    } finally {
      setLoadingCoupons(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    toast.info("Coupon removed")
  }

  const handlePlaceOrder = async () => {
    setError("")

    const { fullName, phone, address: addr, city, pincode } = address

    if (user && user.isBlocked) {
      toast.error("🚫 Your account is blocked. You cannot place orders.")
      return
    }

    if (!fullName || !phone || !addr || !city || !pincode) {
      setError("Please fill all shipping details")
      toast.error("Please fill all shipping details")
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Invalid phone number")
      toast.error("Invalid phone number")
      return
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Invalid pincode")
      toast.error("Invalid pincode")
      return
    }

    try {
      // ✅ Check stock availability before placing order
      for (const item of cart) {
        const productRes = await api.get(`/products/${item.id}`)
        const currentStock = productRes.data.stock

        if (currentStock === 'NA' || (typeof currentStock === 'number' && currentStock < item.qty)) {
          toast.error(`Insufficient stock for ${item.name}. Available: ${currentStock}`)
          return
        }
      }

      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        items: cart,
        shippingAddress: address,
        paymentMethod,
        subtotal,
        discount: appliedCoupon ? discount : 0,
        couponCode: appliedCoupon?.code || null,
        total,
        status: "Placed",
        date: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }

      await api.post("/orders", newOrder)

      if (user?.id) {
        await api.patch(`/users/${user.id}`, {
          shipping: address
        })
      }

      // ✅ DECREMENT STOCK
      await Promise.all(cart.map(async (item) => {
        try {
          const productRes = await api.get(`/products/${item.id}`)
          const currentStock = productRes.data.stock

          if (currentStock !== undefined && currentStock !== null) {
            const newStock = Math.max(0, currentStock - item.qty)
            await api.patch(`/products/${item.id}`, { stock: newStock })
          }
        } catch (err) {
          console.error(`Failed to update stock for product ${item.name}`, err)
        }
      }))

      clearCart()
      toast.success("Order placed successfully! 🎉")
      navigate("/orders")
    } catch (err) {
      toast.error("Failed to place order. Please try again.")
      console.error("Order error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-2">Complete your order details</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">

          {/* LEFT COLUMN: Forms */}
          <div className="lg:col-span-7 space-y-10">

            {/* SHIPPING ADDRESS */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <FiMapPin className="text-black" /> Shipping Details
              </h2>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        name="fullName"
                        placeholder="John Doe"
                        value={address.fullName}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <FiSmartphone className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        name="phone"
                        placeholder="9876543210"
                        value={address.phone}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    placeholder="House No, Street, Landmark"
                    rows={2}
                    value={address.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all font-medium resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input
                      name="city"
                      placeholder="New Delhi"
                      value={address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Pincode</label>
                    <input
                      name="pincode"
                      placeholder="110001"
                      value={address.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 text-center font-medium">{error}</div>}
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <FiCreditCard className="text-black" /> Payment Method
              </h2>

              <div className="grid gap-4">
                {/* COD */}
                <label className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "Cash on Delivery" ? 'border-black bg-black/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay conveniently at your doorstep</p>
                  </div>
                  <FiTruck className="text-2xl text-gray-400" />
                </label>

                {/* UPI */}
                <label className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "UPI" ? 'border-black bg-black/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">UPI / Wallet</p>
                    <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                  </div>
                  <FiSmartphone className="text-2xl text-gray-400" />
                </label>

                {/* CARD */}
                <label className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "Card" ? 'border-black bg-black/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">Secure transaction</p>
                  </div>
                  <FiCreditCard className="text-2xl text-gray-400" />
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="bg-black text-white p-8 rounded-3xl shadow-xl border border-gray-900/5">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <FiBox /> Order Summary
                </h2>

                {/* Products List */}
                <div className="max-h-80 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg bg-white p-1 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full rounded object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Qty: {item.qty} {item.selectedColor && `• ${item.selectedColor}`}
                        </p>
                      </div>
                      <span className="font-semibold text-sm">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 my-6"></div>

                {/* Coupon */}
                <div className="mb-6">
                  {appliedCoupon ? (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex justify-between items-center text-white">
                      <span className="text-sm font-medium flex items-center gap-2"><FiCheck className="text-green-400" /> {appliedCoupon.code} Applied</span>
                      <button onClick={handleRemoveCoupon} className="hover:text-white/80 transition"><FiX /></button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        placeholder="COUPON CODE"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError("")
                        }}
                        className="flex-1 bg-transparent border border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors uppercase placeholder:text-gray-500 text-white"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={loadingCoupons}
                        className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-red-400 text-xs mt-2 ml-1">{couponError}</p>}
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-2xl">₹{total}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 active:scale-[0.98] transition-all shadow-lg"
                >
                  Pay ₹{total}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout
