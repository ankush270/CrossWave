import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import photo from '../assets/signup.png'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showStrength, setShowStrength] = useState(false)
  const [isStrongPassword, setIsStrongPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Check password strength when password changes
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, role: selectedRole })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left Section - Illustration & Info */}
        <div className="hidden lg:block lg:w-5/12 relative bg-blue-600 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-95" />
          
          {/* Content Container */}
          <div className="relative h-full flex flex-col">
            {/* Logo & Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">TradePal</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Transform Your Trading Experience
              </h1>
              <p className="text-base text-blue-100">
                Join the platform that's revolutionizing cross-border trade
              </p>
            </div>

            {/* Illustration */}
            <div className="flex-grow flex items-center justify-center">
              <img 
                src={photo} 
                alt="Business Illustration" 
                className="w-full h-auto max-h-[280px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                'Access global markets',
                'Secure transactions',
                'Real-time tracking',
                '24/7 Support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-7/12 p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
              <p className="text-gray-600 mt-2">Start your global trading journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="flex gap-3 mb-6">
                {[
                  { role: 'buyer', icon: '🛒', label: 'Buyer' },
                  { role: 'seller', icon: '💼', label: 'Seller' }
                ].map((option) => (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => setSelectedRole(option.role)}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === option.role
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xl mb-1">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator - Only shows when password field has input */}
                  {showStrength && (
                    <div className="mt-2">
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${isStrongPassword ? 'bg-green-500' : 'bg-red-500'} transition-all duration-300`}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <p className="text-sm mt-1 text-gray-600">
                        {isStrongPassword 
                          ? 'Strong password' 
                          : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium"
              >
                Create Account
              </button>

              {/* Social Login */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {['Google', 'Facebook', 'LinkedIn'].map((provider) => (
                  <button
                    key={provider}
                    type="button"
                    className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    <span className="sr-only">Sign up with {provider}</span>
                    <div className="w-5 h-5 mx-auto text-gray-700">{provider[0]}</div>
                  </button>
                ))}
              </div>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
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