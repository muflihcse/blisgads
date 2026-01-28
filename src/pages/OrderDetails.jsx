import { useEffect, useState } from "react";
import { FiPackage, FiMapPin, FiCreditCard, FiArrowLeft, FiLoader, FiTruck, FiCheckCircle, FiXCircle, FiFileText } from "react-icons/fi"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/apiContext";
import { formatDateTime } from "../utils/formatDate";

function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/orders/${id}`)
        setOrder(res.data)
        setError(null)
      } catch (err) {
        console.error("Order fetch error:", err)
        setError("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase() || ""
    if (statusLower.includes("delivered")) return "bg-green-100 text-green-800 border-green-200"
    if (statusLower.includes("shipped")) return "bg-blue-100 text-blue-800 border-blue-200"
    if (statusLower.includes("processing")) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (statusLower.includes("cancelled")) return "bg-red-100 text-red-800 border-red-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-500">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Order not found"}</p>
          <button
            onClick={() => navigate("/orders")}
            className="border px-6 py-2 hover:bg-black hover:text-white transition"
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  const getStatusStep = (status) => {
    const s = status?.toLowerCase() || ""
    if (s.includes("delivered")) return 4
    if (s.includes("out for delivery")) return 3
    if (s.includes("shipped")) return 2
    if (s.includes("processing")) return 1
    return 0 // Placed
  }

  const currentStep = getStatusStep(order.status)
  const steps = [
    { label: "Order Placed", icon: FiFileText },
    { label: "Processing", icon: FiPackage },
    { label: "Shipped", icon: FiTruck },
    { label: "Delivered", icon: FiCheckCircle },
  ]
  const isCancelled = order.status?.toLowerCase().includes("cancelled")

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-24">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition font-medium"
      >
        <FiArrowLeft size={18} />
        Back to Orders
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Order #{order.id.slice(-8).toUpperCase()}
        </h1>
        <span className={`px-4 py-2 rounded-full text-sm font-bold border flex items-center gap-2 ${getStatusBadgeClass(order.status)}`}>
          {order.status === 'Shipped' && <FiTruck />}
          {order.status === 'Delivered' && <FiCheckCircle />}
          {order.status === 'Processing' && <FiPackage />}
          {order.status === 'Cancelled' && <FiXCircle />}
          {order.status}
        </span>
      </div>

      {/* TIMELINE */}
      {!isCancelled && (
        <div className="mb-12 border rounded-2xl p-8 bg-white shadow-sm relative overflow-hidden">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 hidden md:block -translate-y-1/2"></div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
            {steps.map((step, idx) => {
              const isActive = idx <= currentStep
              const isCompleted = idx < currentStep
              const Icon = step.icon

              return (
                <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 flex-1 relative">
                  {/* Connecting Line (Mobile: Vertical, Desktop: Horizontal) */}
                  {idx !== 0 && (
                    <div className={`
                                content-[''] absolute 
                                md:top-1/2 md:right-1/2 md:w-full md:h-[2px] md:-translate-y-1/2 md:-z-10
                                left-[1.125rem] top-[-2rem] h-8 w-[2px] md:hidden
                                ${isActive ? 'bg-black' : 'bg-gray-200'}
                             `}></div>
                  )}

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white ${isActive ? 'border-black text-black scale-110' : 'border-gray-200 text-gray-300'
                    }`}>
                    <Icon size={18} />
                  </div>
                  <div className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-400'}`}>
                    {step.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-10">

        {/* LEFT COL: Items */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FiPackage className="text-gray-400" /> Items
            </h2>
            <div className="divide-y">
              {order.items?.map((item, idx) => (
                <div key={item.id || idx} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg bg-gray-50" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.qty} × ₹{item.price}</p>
                    {item.selectedColor && <p className="text-xs text-gray-400 mt-1">Color: {item.selectedColor}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL: Details */}
        <div className="space-y-6">

          {/* SHIPPING */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FiMapPin className="text-gray-400" /> Shipping
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-black">{order?.shippingAddress?.fullName}</p>
              <p>{order?.shippingAddress?.address}</p>
              <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.pincode}</p>
              <p className="mt-2 text-xs text-gray-400">Phone: {order?.shippingAddress?.phone}</p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FiCreditCard className="text-gray-400" /> Payment
            </h3>
            <p className="text-sm font-medium">{order?.paymentMethod}</p>
            <p className="text-xs text-gray-500 mt-1">
              Date: {formatDateTime(order.createdAt || order.date)}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="bg-gray-50 border rounded-2xl p-6">
            <h3 className="font-bold mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{order.subtotal || order.total}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>₹{order.total || order.totalAmount}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderDetails
