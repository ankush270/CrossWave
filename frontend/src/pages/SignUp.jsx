import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import photo from '../assets/signup.png'
import { motion } from 'framer-motion'
import { FaStore, FaShoppingBag, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa'
import {useAuth} from "../contexts/AuthContext.jsx";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showStrength, setShowStrength] = useState(false)
  const [isStrongPassword, setIsStrongPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const {register} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword') {
        setPasswordsMatch(formData.password === value)
      } else {
        setPasswordsMatch(formData.confirmPassword === value)
      }
    }

    if (name === 'password') {
      if (value.length === 0) {
        setShowStrength(false)
      } else {
        setShowStrength(true)
        checkPasswordStrength(value)
      }
    }
  }

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8

    setIsStrongPassword(
      hasUpperCase && 
      hasLowerCase && 
      hasNumber && 
      hasSymbol && 
      isLongEnough
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, role: selectedRole })

    try {
      await register({ ...formData, role: selectedRole, phone: String(10000000*Math.random()) });
      navigate('/');
    }catch (e) {
      setError(e.response?.data?.error || 'Failed to register');
      console.log('Error occurred during registration: ', e)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-2">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Section - Illustration & Info */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-6 items-center justify-center overflow-hidden">
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
                className="text-3xl font-bold text-white mb-3"
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
                Transform Your Trading Experience
              </motion.h2>
              
              <motion.p 
                className="text-base text-blue-100 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join thousands of businesses already trading globally
              </motion.p>

              {/* Added Photo Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative my-6 mx-auto w-48 h-48"
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
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={photo} 
                    alt="Trading Illustration" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
                </motion.div>
                
                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full"
                  animate={{
                    y: [-4, 4, -4],
                    x: [-4, 4, -4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full"
                  animate={{
                    y: [4, -4, 4],
                    x: [4, -4, 4],
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>

              {/* Feature List */}
              <motion.div className="space-y-2">
                {[
                  'Global Network Access',
                  'Secure Transactions',
                  'Real-time Analytics',
                  '24/7 Support'
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center justify-center gap-2 text-white/80"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-1.5 h-1.5 bg-blue-300 rounded-full"
                    />
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 p-6">
          {/* Background Gradient & Glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md" />
          
          {/* Form Content */}
          <div className="relative z-10 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-1">
                Create Account
              </h2>
              <p className="text-sm text-gray-300">Start your trading journey</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'seller', icon: FaStore, label: 'Seller' },
                  { id: 'buyer', icon: FaShoppingBag, label: 'Buyer' }
                ].map(({ id, icon: Icon, label }) => (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => setSelectedRole(id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === id
                        ? 'border-blue-400 bg-blue-500/20 backdrop-blur-sm'
                        : 'border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-2 rounded-lg ${
                        selectedRole === id ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
                      }`}>
                        <Icon className="text-xl" />
                      </div>
                      <span className={`font-medium ${
                        selectedRole === id ? 'text-blue-400' : 'text-gray-300'
                      }`}>
                        {label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Input Fields */}
              <motion.div className="space-y-3">
                {/* Full Name Input */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 pl-10 bg-white/20 border-2 border-white/20 rounded-lg 
                        focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 
                        text-white placeholder-gray-300 transition-all backdrop-blur-sm
                        hover:bg-white/25 focus:bg-white/25"
                      placeholder="John Doe"
                    />
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 pl-10 bg-white/20 border-2 border-white/20 rounded-lg 
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
                  <label className="block text-sm font-medium text-white mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 pl-10 pr-10 bg-white/20 border-2 border-white/20 rounded-lg 
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

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 pl-10 bg-white/20 border-2 
                        ${passwordsMatch ? 'border-white/20' : 'border-red-500/50'} 
                        rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 
                        text-white placeholder-gray-300 transition-all backdrop-blur-sm
                        hover:bg-white/25 focus:bg-white/25`}
                      placeholder="••••••••"
                    />
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                    {formData.confirmPassword && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 
                          ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {passwordsMatch ? '✓' : '✗'}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={!passwordsMatch}
                className={`w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 
                  hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200
                  ${!passwordsMatch ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Create Account
              </motion.button>

              {/* Social Sign Up */}
              <div className="relative my-4">
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
              <div className="grid grid-cols-3 gap-2">
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

              {/* Login Link */}
              <p className="text-center text-gray-400 mt-4 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp 