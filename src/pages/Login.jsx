import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Email and password is required!")
      toast.error("Email and password is required!")
      return
    }

    const success = await login(email, password)

    if (success) {
      toast.success("Login successful ✅")
      navigate("/")
    } else {
      setError("Invalid email or password")
      toast.error("Invalid email or password ❌")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-gray-800 p-8"
      >
        <h2 className="text-xl mb-6 tracking-wider text-white">
          LOGIN
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 bg-black border border-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 bg-black border border-gray-700 text-white"
        />

        <button className="w-full border border-white py-2 text-white hover:bg-white hover:text-black transition">
          LOGIN
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
