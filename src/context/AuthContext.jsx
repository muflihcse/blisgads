import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/apiContext"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  
  const login = async (email, password) => {
    const res = await api.get(`/users?email=${email}&password=${password}`)

    if (res.data.length > 0) {
      const loggedUser = res.data[0]

      setUser(loggedUser)
      localStorage.setItem("user", JSON.stringify(loggedUser)) 

      return true
    }
    return false
  }

  
  const register = async (name, email, password) => {
    const check = await api.get(`/users?email=${email}`)
    if (check.data.length > 0) {
      throw new Error("Email already exists")
    }

    const res = await api.post("/users", {
      name,
      email,
      password,
      cart: [],
      wishlist: []
    })

    
    setUser(res.data)
    localStorage.setItem("user", JSON.stringify(res.data))
  }

  
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
