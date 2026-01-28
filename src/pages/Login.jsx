import { useState } from "react"
import { z } from "zod"
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

    const loginSchema = z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(1, "Password is required"),
    })

    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      const errorMsg = result.error.errors[0].message
      setError(errorMsg)
      toast.error(errorMsg)
      return
    }


    if (email === 'admin@bliszgads.com') {
      if (password === 'admin123') {
        localStorage.setItem('adminToken', 'true')
        window.dispatchEvent(new Event("storage"))
        toast.success("Welcome Admin!")
        navigate("/admin/dashboard")
      } else {
        setError("Invalid admin credentials")
        toast.error("Invalid admin credentials")
      }
      return
    }

    try {
      const success = await login(email, password)

      if (success) {
        toast.success("Login successful ✅")
        navigate("/")
      } else {
        setError("Invalid email or password")
        toast.error("Invalid email or password ❌")
      }
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-black mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">Please sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 transition-all">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <button className="w-full mt-8 bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-[1.01] shadow-lg shadow-gray-200">
          SIGN IN
        </button>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
