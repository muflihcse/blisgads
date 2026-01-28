
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

  // login
  const login = async (email, password) => {
    const res = await api.get(`/users?email=${email}&password=${password}`)

    if (res.data.length > 0) {
      const loggedUser = res.data[0]

      if (loggedUser.isBlocked) {
        throw new Error("❌ Blocked users cannot login");
      }


      const { password: userPassword, ...safeUser } = loggedUser

      setUser(safeUser)
      localStorage.setItem("user", JSON.stringify(safeUser))
      window.dispatchEvent(new Event("storage"))

      return true
    }
    return false
  }


  const register = async (name, email, password) => {
    const check = await api.get(`/users?email=${email}`)
    if (check.data.length > 0) {
      throw new Error("Email already exists")
    }

    await api.post("/users", {
      name,
      email,
      password,
      isBlocked: false,
      cart: [],
      wishlist: []
    })
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
