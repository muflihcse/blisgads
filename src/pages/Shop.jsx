import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import api from "../api/apiContext"

function Shop() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data)
    })
  }, [])

  
  const filteredProducts = products.filter(product =>
    JSON.stringify(product)
      .toLowerCase()
      .includes(searchQuery)
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-3xl tracking-wider mb-12">
        SHOP
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-400">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default Shop
