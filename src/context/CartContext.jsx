import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/apiContext"
import { useAuth } from "./AuthContext"

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

   
    api.patch(`/users/${user.id}`, { cart })
  }, [cart, user, isLoaded])


  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor
      )

      if (exists) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      return [...prev, product]
    })
  }

 
  const increaseQty = (id, color) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === color
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    )
  }

  
  const decreaseQty = (id, color) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedColor === color
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  
  const removeFromCart = (id, color) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.selectedColor === color)
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
