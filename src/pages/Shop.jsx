import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import api from "../api/apiContext"
import { FiChevronDown } from "react-icons/fi"

function Shop() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    setLoading(true)
    api.get("/products")
      .then((res) => {
        setProducts(res.data)
      })
      .catch(err => console.error("Shop API Error:", err))
      .finally(() => setLoading(false))
  }, [])

  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery ||
      JSON.stringify(product).toLowerCase().includes(searchQuery)
    const isVisibleInShop = product.showInShop !== false // Show by default if not set
    return matchesSearch && isVisibleInShop
  })

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.price || 0) - (b.price || 0))
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.price || 0) - (a.price || 0))
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sortBy === "discount") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0))
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl tracking-wider">SHOP</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">


          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:border-black"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Best Discount</option>
          </select>
        </div>
      </div>

      <div className="w-full">

        {/* Products Grid */}
        <div className="w-full">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">No products found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 border rounded ${currentPage === page
                            ? 'bg-black text-white'
                            : 'hover:bg-gray-100'
                            } transition`}
                        >
                          {page}
                        </button>
                      )
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="px-2">...</span>
                    }
                    return null
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Product Modal */}
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
