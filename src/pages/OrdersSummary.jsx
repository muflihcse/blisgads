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
import { Calendar, Eye } from "lucide-react"

const Orders = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      const res = await api.get(`/orders?userId=${user.id}`)

      // ✅ SORT: NEWEST FIRST
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )

      setOrders(sortedOrders)
      setLoading(false)
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl">No orders yet</h2>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl mb-6">My Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="border rounded mb-6">
          <div className="bg-black text-white p-4 flex justify-between">
            <div>
              <p>Order #{order.id}</p>
              <p className="text-sm flex items-center gap-2">
                <Calendar size={14} />
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>
            <span>{order.status}</span>
          </div>

          <div className="p-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-2">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <div className="font-bold mt-4">
              Total: ₹{order.total}
            </div>

            <button
              onClick={() => navigate(`/orders/${order.id}`)}
              className="mt-4 flex items-center gap-2 text-sm text-blue-600"
            >
              <Eye size={14} /> View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
