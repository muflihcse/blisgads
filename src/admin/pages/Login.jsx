// import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import '../styles/admin.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useAuth();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         login(email, password);
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
//             <div className="bg-white p-14 rounded-lg w-full max-w-md shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-gray-200 animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)]">
//                 <div className="text-center mb-12">
//                     <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
//                         <span className="text-white font-black text-2xl">B</span>
//                     </div>
//                     <h2 className="m-0 text-3xl font-bold tracking-tight text-black">Sign in to Bliszgads</h2>
//                     <p className="text-gray-500 text-base mt-2">Enter your administrator details below.</p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-6">
//                         <label className="block mb-2 font-medium text-sm text-gray-500">Email</label>
//                         <input
//                             type="email"
//                             className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base bg-white transition-all duration-400 focus:outline-none focus:border-black focus:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] text-black"
//                             placeholder="admin@bliszgads.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block mb-2 font-medium text-sm text-gray-500">Password</label>
//                         <input
//                             type="password"
//                             className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base bg-white transition-all duration-400 focus:outline-none focus:border-black focus:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] text-black"
//                             placeholder="Required"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="mt-10">
//                         <button
//                             type="submit"
//                             className="w-full px-6 py-4 rounded-lg font-semibold cursor-pointer transition-all duration-400 border-none text-base inline-flex items-center justify-center gap-2.5 bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
//                         >
//                             Continue
//                         </button>
//                     </div>
//                 </form>

//                 <div className="mt-12 p-5 bg-gray-100 rounded-xl text-sm border border-gray-200">
//                     <div className="font-semibold text-black mb-2">Demo Access</div>
//                     <div className="text-gray-500">Email: admin@bliszgads.com</div>
//                     <div className="text-gray-500">Pass: admin123</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
