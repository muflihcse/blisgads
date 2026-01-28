import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/apiContext"
import { useAuth } from "./AuthContext"
import { toast } from "react-toastify"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { user } = useAuth()


  useEffect(() => {
    if (!user) return

    const localCart = localStorage.getItem(`cart_${user.id}`)

    if (localCart) {
      setCart(JSON.parse(localCart))
    } else {
      setCart(user.cart || [])
    }

    setIsLoaded(true)
  }, [user])


  useEffect(() => {
    if (!user || !isLoaded) return

    localStorage.setItem(
      `cart_${user.id}`,
      JSON.stringify(cart)
    )
    window.dispatchEvent(new Event("storage"))


    api.patch(`/users/${user.id}`, { cart })
  }, [cart, user, isLoaded])


  const addToCart = (product) => {
    if (user && user.isBlocked) {
      toast.error("🚫 Your account is blocked. You cannot add items to cart.");
      return;
    }

    setCart((prev) => {
      const exists = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedModel === product.selectedModel
      )

      if (exists) {
        const latestStock = product.stock !== undefined ? product.stock : exists.stock

        if (latestStock !== undefined && exists.qty + (product.qty || 1) > latestStock) {
          toast.error(`Stock limit reached! Only ${latestStock} items available.`)
          return prev
        }
        return prev.map((item) =>
          item.id === product.id &&
            item.selectedColor === product.selectedColor &&
            item.selectedModel === product.selectedModel
            ? { ...item, qty: item.qty + (product.qty || 1), stock: latestStock }
            : item
        )
      }

      return [...prev, product]
    })
  }


  const increaseQty = (id, color, model) => {
    setCart((prev) => {
      const item = prev.find(i => i.id === id && i.selectedColor === color && i.selectedModel === model)
      if (item && item.stock && item.qty >= item.stock) {
        toast.error(`Stock limit reached! Only ${item.stock} items left.`)
        return prev
      }
      return prev.map((item) =>
        item.id === id && item.selectedColor === color && item.selectedModel === model
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    })
  }


  const decreaseQty = (id, color, model) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedColor === color && item.selectedModel === model
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    )
  }


  const removeFromCart = (id, color, model) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.selectedColor === color && item.selectedModel === model)
      )
    )
  }


  const clearCart = () => {
    setCart([])
    if (user) {
      localStorage.removeItem(`cart_${user.id}`)
      api.patch(`/users/${user.id}`, { cart: [] })
    }
  }


  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.qty ?? 1),
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
