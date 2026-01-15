
import { useEffect, useRef, useState } from "react"
import VideoBanner from "../components/VideoBanner"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import api from "../api/apiContext"

function Home() {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)
  const productRef = useRef()

  useEffect(() => {
    api.get("/products?trending=true")
      .then(res => setTrending(res.data))
      .catch(err => console.error("HOME API ERROR:", err))
      .finally(() => setLoading(false))
  }, [])

  const scrollToProducts = () => {
  if (productRef.current) {
    const yOffset = -80 // adjust if navbar height changes
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
      <VideoBanner scrollTopro={scrollToProducts}/>

      <section className="max-w-7xl mx-auto px-6 py-20" ref={productRef}>
        <h2 className="text-2xl tracking-wider mb-10">
          TRENDING CASES
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading trending products...</p>
        ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
  {trending.slice(0,3).map(product => (
    <ProductCard
      key={product.id}
      product={product}
      onOpen={setOpen}
    />
  ))}
</div>


        )}
      </section>

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
