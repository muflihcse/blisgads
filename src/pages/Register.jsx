import { useState } from "react"
import { z } from "zod"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setValidationErrors({})


    const registerSchema = z.object({
      name: z.string().trim().regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "Enter a proper name"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters")
    })

    const result = registerSchema.safeParse({ name, email, password })

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setValidationErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : "",
        email: fieldErrors.email ? fieldErrors.email[0] : "",
        password: fieldErrors.password ? fieldErrors.password[0] : ""
      })
      return
    }

    const trimmedName = result.data.name

    try {
      await register(trimmedName, email, password)
      navigate("/login")
    } catch (err) {
      setError(err.message)
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
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">Join us for premium experience</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 transition-all">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3.5 bg-gray-50 border rounded-lg text-black focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${validationErrors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-black focus:ring-black"}`}
            />
            {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3.5 bg-gray-50 border rounded-lg text-black focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${validationErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-black focus:ring-black"}`}
            />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3.5 bg-gray-50 border rounded-lg text-black focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 ${validationErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-black focus:ring-black"}`}
            />
            {validationErrors.password && <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-[1.01] shadow-lg shadow-gray-200"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
