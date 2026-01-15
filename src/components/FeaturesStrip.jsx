import {
  FiTruck,
  FiRefreshCcw,
  FiLock,
  FiHeadphones
} from "react-icons/fi"

function FeaturesStrip() {
  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

        {/* ------------Free Shipping------ */}
        <div>
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white">
            <FiTruck size={22} />
          </div>
          <h3 className="font-semibold text-lg">Free Shipping</h3>
          <p className="text-sm text-gray-500 mt-2">
            Get free shipping on prepaid orders
          </p>
        </div>

        {/*---------- Easy Returns----------- */}
        <div>
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white">
            <FiRefreshCcw size={22} />
          </div>
          <h3 className="font-semibold text-lg">Easy Returns</h3>
          <p className="text-sm text-gray-500 mt-2">
            Hassle-free 7 days returns
          </p>
        </div>

        {/* ------------Secure Payment-------------- */}
        <div>
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white">
            <FiLock size={22} />
          </div>
          <h3 className="font-semibold text-lg">Secure Payment</h3>
          <p className="text-sm text-gray-500 mt-2">
            Safe & trusted payment methods
          </p>
        </div>

        {/* -------------------Customer Support--------------- */}
        <div>
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white">
            <FiHeadphones size={22} />
          </div>
          <h3 className="font-semibold text-lg">Customer Support</h3>
          <p className="text-sm text-gray-500 mt-2">
            Quick assistance & dedicated support
          </p>
        </div>

      </div>
    </div>
  )
}

export default FeaturesStrip



