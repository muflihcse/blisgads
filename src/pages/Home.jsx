import { useEffect, useRef, useState } from "react"
import VideoBanner from "../components/VideoBanner"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import api from "../api/apiContext"
import { Link } from "react-router-dom"
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi"

function Home() {
  const [trending, setTrending] = useState([])
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [bannerLoading, setBannerLoading] = useState(true)
  const [open, setOpen] = useState(null)
  const productRef = useRef()

  useEffect(() => {
    // Fetch trending products
    api.get("/products")
      .then(res => {
        const trendingProducts = res.data.filter(p => p.trending === true)
        setTrending(trendingProducts.length > 0 ? trendingProducts : res.data.slice(0, 6))
      })
      .catch(err => console.error("HOME API ERROR:", err))
      .finally(() => setLoading(false))

    // Fetch active banners
    api.get("/banners")
      .then(res => {
        const activeBanners = res.data.filter(b => b.active === true)
        setBanners(activeBanners)
      })
      .catch(err => console.error("Banner fetch error:", err))
      .finally(() => setBannerLoading(false))
  }, [])

  const [currentBanner, setCurrentBanner] = useState(0)

  // Auto-slide effect for banners
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners])

  const nextSlide = () => {
    setCurrentBanner(prev => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentBanner(prev => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const scrollToProducts = () => {
    if (productRef.current) {
      const yOffset = -80
      const y =
        productRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth"
      })
    }
  }

  return (
    <div>
      {/* Hero Banner Section */}
      <VideoBanner scrollTopro={scrollToProducts} />

      {/* Trending Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" ref={productRef}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl tracking-wider font-semibold">
            TRENDING CASES
          </h2>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            View All <FiArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
              <p className="text-gray-400">Loading trending products...</p>
            </div>
          </div>
        ) : trending.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No trending products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {trending.slice(0, 6).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setOpen}
              />
            ))}
          </div>
        )}

        {trending.length > 6 && (
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block border border-black px-8 py-3 hover:bg-black hover:text-white transition"
            >
              View More Products
            </Link>
          </div>
        )}
      </section>

      {/* Promotional Banners Section - Slideshow */}
      {!bannerLoading && banners.length > 0 && (
        <section className="relative h-[60vh] w-full overflow-hidden mb-20 group">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              {banner.link ? (
                <Link to={banner.link} className="block w-full h-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ) : (
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

              {banner.title && (
                <div className="absolute bottom-16 left-10 text-white z-20 max-w-xl">
                  <h2 className="text-4xl font-bold mb-4 tracking-tight drop-shadow-lg">{banner.title}</h2>
                  {banner.link && (
                    <Link to={banner.link} className="inline-block border-b border-white pb-1 text-sm font-medium hover:text-gray-200 transition-colors pointer-events-auto">
                      DISCOVER MORE
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Arrow Buttons */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous Slide"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next Slide"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentBanner ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Product Modal */}
      {open && (
        <ProductModal
          product={open}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  )
}

export default Home
