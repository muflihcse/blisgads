import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { User } from "lucide-react"

const PublicRoute = ({ children }) => {
    
  const { user } = useAuth()
  

  if (user) {
    return <Navigate to={'/'} replace />
  }

  return children
}

export default PublicRoute