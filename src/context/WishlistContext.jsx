import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import api from "../api/apiContext"

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([])
  const [isLoaded, setIsLoaded] = useState(false) 

 
  useEffect(() => {
    if (!user) return

    const localWishlist = localStorage.getItem(
      `wishlist_${user.id}`
    )

    if (localWishlist) {
      setWishlist(JSON.parse(localWishlist))
    } else if (user.wishlist) {
      setWishlist(user.wishlist)
    } else {
      setWishlist([])
    }

    setIsLoaded(true) 
  }, [user])

  
  useEffect(() => {
    if (!user || !isLoaded) return

    localStorage.setItem(
      `wishlist_${user.id}`,
      JSON.stringify(wishlist)
    )

    api.patch(`/users/${user.id}`, {
      wishlist
    })
  }, [wishlist, user, isLoaded])

 
  const toggleWishlist = async (product) => {
    if (!user) {
      alert("Please login to use wishlist")
      return
    }

    const exists = wishlist.some(
      item => item.id === product.id
    )

    const updatedWishlist = exists
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product]

    setWishlist(updatedWishlist)
  }

  
  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
