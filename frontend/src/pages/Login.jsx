import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaEnvelope, FaLock, FaGoogle, FaGithub, 
  FaLinkedin, FaEye, FaEyeSlash 
} from 'react-icons/fa'
import {useAuth} from "../contexts/AuthContext.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)

    try{
      await login(formData.email, formData.password);
      navigate('/');
    }catch (e) {
      setError(error.response?.data?.error || 'Failed to login');
      console.log('Error occurred: ' , e);
    }

  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Section - Illustration & Info */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Animated Circles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 border border-white/20 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1 + i * 0.2, 1.2 + i * 0.2, 1 + i * 0.2],
                  rotate: [0, 360],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  x: [-20, 20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Gradient Orbs */}
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [-50, 50, -50],
                y: [-50, 50, -50],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [50, -50, 50],
                y: [50, -50, 50],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 max-w-xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-white mb-6"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0.8), rgba(255,255,255,1))',
                  backgroundSize: '200% 100%',
                  backgroundClip: 'text',
                }}
              >
                Welcome Back!
              </motion.h2>
              
              <motion.p 
                className="text-lg text-blue-100 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Continue your trading journey with us
              </motion.p>

              {/* Custom Animated Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative my-12 mx-auto w-64 h-64"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Custom SVG Illustration */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg 
                    viewBox="0 0 200 200" 
                    className="w-40 h-40"
                  >
                    {/* Animated Circle Background */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* User Icon Circle */}
                    <motion.circle
                      cx="100"
                      cy="80"
                      r="25"
                      fill="rgba(255,255,255,0.2)"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* User Icon Body */}
                    <motion.path
                      d="M60,140 Q100,180 140,140"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />

                    {/* Decorative Elements */}
                    {[...Array(8)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={100 + 50 * Math.cos((i * Math.PI) / 4)}
                        cy={100 + 50 * Math.sin((i * Math.PI) / 4)}
                        r="4"
                        fill="rgba(255,255,255,0.3)"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </svg>

                  {/* Animated Rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-full h-full border-2 border-white/10 rounded-full`}
                      style={{ scale: 0.6 + i * 0.2 }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 10 + i * 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Decorative Dots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${80 + i * 3}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-7/12 p-8 relative overflow-hidden">
          {/* Background Gradient & Glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md" />
          
          {/* Form Content */}
          <div className="relative z-10 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                Login to Your Account
              </h2>
              <p className="text-gray-300">Welcome back! Please enter your details</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Fields */}
              <motion.div className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 bg-white/20 border-2 border-white/20 rounded-xl 
                        focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 
                        text-white placeholder-gray-300 transition-all backdrop-blur-sm
                        hover:bg-white/25 focus:bg-white/25"
                      placeholder="john@example.com"
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 pr-11 bg-white/20 border-2 border-white/20 rounded-xl 
                        focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 
                        text-white placeholder-gray-300 transition-all backdrop-blur-sm
                        hover:bg-white/25 focus:bg-white/25"
                      placeholder="••••••••"
                    />
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-300">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 
                  hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
              >
                Sign In
              </motion.button>

              {/* Social Sign In */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: FaGoogle, color: 'hover:bg-red-500/20 hover:border-red-500/50' },
                  { icon: FaGithub, color: 'hover:bg-gray-500/20 hover:border-gray-500/50' },
                  { icon: FaLinkedin, color: 'hover:bg-blue-500/20 hover:border-blue-500/50' }
                ].map(({ icon: Icon, color }, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-white/10 
                      ${color} transition-all duration-200 text-gray-300 hover:text-white`}
                  >
                    <Icon className="mx-auto text-xl" />
                  </motion.button>
                ))}
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-400 mt-8">
                Don't have an account?{' '}
                <Link 
                  to="/signup"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 