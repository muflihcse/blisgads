import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")

  // ✅ NAME VALIDATION
  const trimmedName = name.trim()
  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/

  if (!trimmedName || !nameRegex.test(trimmedName)) {
    setError("Enter a proper name")
    return
  }

  // ✅ PASSWORD VALIDATION
  if (password.length < 6) {
    setError("Password must be at least 6 characters")
    return
  }

  try {
    await register(trimmedName, email, password)
    navigate("/login")
  } catch (err) {
    setError(err.message)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-gray-800 p-8"
      >
        <h2 className="text-xl mb-6 tracking-wider text-white">
          REGISTER
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 bg-black border border-gray-700 text-white"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 bg-black border border-gray-700 text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 bg-black border border-gray-700 text-white"
          required
        />

        <button
          type="submit"
          className="w-full border border-white py-2 text-white hover:bg-white hover:text-black transition"
        >
          REGISTER
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
