import { useEffect, useState } from "react";
import { FiPackage, FiMapPin, FiCreditCard } from "react-icons/fi"
import { useParams } from "react-router-dom"
import api from "../api/apiContext";
import { formatDateTime } from "../utils/formatDate";

function OrderDetails() {
    const {id} = useParams()
    const [order, setOrder]  = useState()

    useEffect(() => {
        api.get(`orders/${id}`).then(res => setOrder(res.data))
    }, [id])
    
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold mb-10">
        Order Details
      </h1>

     
      <div className="border rounded-xl p-6 mb-10 grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{order?.id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-medium">{formatDateTime(order?.createdAt)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-black text-white">
            {order?.status}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">

        
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <FiPackage />
            Items
          </h2>

          <div className="border rounded-xl divide-y">
            {order?.items?.map(item => (
              <div
                key={item?.id}
                className="flex justify-between items-center p-5"
              >
                <div>
                  <p className="font-medium">{item?.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item?.qty}
                  </p>
                </div>

                <p className="font-medium">
                  ₹{item?.price * item?.qty}
                </p>
              </div>
            ))}
          </div>
        </div>

     
        <div className="space-y-8">

          {/*shipp */}
          <div className="border rounded-xl p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FiMapPin />
              Shipping Address
            </h3>

            <p className="text-sm">{order?.shippingAddress?.fullName}</p>
            <p className="text-sm">{order?.shippingAddress?.address}</p>
            <p className="text-sm">
              {order?.shippingAddress?.city} – {order?.shippingAddress?.pincode}
            </p>
            <p className="text-sm mt-2">
              Phone: {order?.shippingAddress?.phone}
            </p>
          </div>

          {/* payment*/}
          <div className="border rounded-xl p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FiCreditCard />
              Payment
            </h3>

            <p className="text-sm">
              Method: {order?.paymentMethod}
            </p>
          </div>

          {/* total */}
          <div className="border rounded-xl p-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{order?.total}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderDetails
