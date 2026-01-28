// import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import api from "../api/apiContext"
// import { Calendar, Package, Eye } from "lucide-react"

// const Orders = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return

//       const res = await api.get(`/orders?userId=${user.id}`)
//       setOrders(res.data)
//       setLoading(false)
//     }

//     fetchOrders()
//   }, [user])

//   if (loading) {
//     return <div className="text-center py-20">Loading...</div>
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-xl">No orders yet</h2>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       <h1 className="text-3xl mb-6">My Orders</h1>

//       {orders.map(order => (
//         <div key={order.id} className="border rounded mb-6">
//           <div className="bg-black text-white p-4 flex justify-between">
//             <div>
//               <p>Order #{order.id}</p>
//               <p className="text-sm flex items-center gap-2">
//                 <Calendar size={14} />
//                 {new Date(order.createdAt).toDateString()}
//               </p>
//             </div>
//             <span>{order.status}</span>
//           </div>

//           <div className="p-4">
//             {order.items.map((item, i) => (
//               <div key={i} className="flex justify-between py-2">
//                 <span>{item.name} × {item.qty}</span>
//                 <span>₹{item.price * item.qty}</span>
//               </div>
//             ))}

//             <div className="font-bold mt-4">
//               Total: ₹{order.total}
//             </div>

//             <button
//               onClick={() => navigate(`/orders/${order.id}`)}
//               className="mt-4 flex items-center gap-2 text-sm text-blue-600"
//             >
//               <Eye size={14} /> View Details
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Orders

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../api/apiContext"
import { Calendar, Eye, Package, MapPin } from "lucide-react"
import { formatDateTime } from "../utils/formatDate"

const Orders = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const res = await api.get(`/orders?userId=${user.id}`)

        const sortedOrders = res.data.sort(
          (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        )

        setOrders(sortedOrders)
        setError(null)
      } catch (err) {
        console.error("Orders fetch error:", err)
        setError("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase() || ""
    if (statusLower.includes("delivered")) return "bg-green-100 text-green-800"
    if (statusLower.includes("shipped")) return "bg-blue-100 text-blue-800"
    if (statusLower.includes("processing")) return "bg-yellow-100 text-yellow-800"
    if (statusLower.includes("cancelled")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="border px-6 py-2 hover:bg-black hover:text-white transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
          <button
            onClick={() => navigate("/shop")}
            className="border px-6 py-3 hover:bg-black hover:text-white transition"
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pt-24">
      <h1 className="text-3xl tracking-wider mb-8">MY ORDERS</h1>
      <p className="text-gray-500 mb-8">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-black text-white p-4 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="font-semibold text-lg">Order #{order.id.slice(-8).toUpperCase()}</p>
                <p className="text-sm flex items-center gap-2 mt-1 text-gray-300">
                  <Calendar size={14} />
                  {formatDateTime(order.createdAt || order.date)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Package size={18} />
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.qty} {item.selectedColor && `• ${item.selectedColor}`}
                          </p>
                        </div>
                        <span className="font-semibold">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.shippingAddress && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin size={18} />
                      Shipping Address
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium">{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                      <p>Phone: {order.shippingAddress.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold">{order.paymentMethod || "Cash on Delivery"}</p>
                </div>
                <div className="text-right">
                  {order.discount > 0 && (
                    <p className="text-sm text-gray-500 mb-1">
                      Discount: <span className="text-green-600">-₹{order.discount}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold">₹{order.total || order.totalAmount}</p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/orders/${order.id}`)}
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition"
              >
                <Eye size={16} /> View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
