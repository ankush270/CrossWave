import React, { useEffect, useState } from 'react'
import importExport from '../assets/import-export.jpg'

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    steps: false,
    testimonials: false
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['features', 'steps', 'testimonials'].map(
      id => document.getElementById(id)
    );

    sections.forEach(section => section && observer.observe(section));

    return () => sections.forEach(section => section && observer.unobserve(section));
  }, []);

  const features = [
    {
      title: "Cost-effective Transactions",
      description: "Minimize fees and maximize profits with our competitive rates",
      icon: "💰"
    },
    {
      title: "Real-Time Tracking",
      description: "Monitor your shipments 24/7 with precise tracking",
      icon: "🚚"
    },
    {
      title: "Compliance Support",
      description: "Stay compliant with automated documentation",
      icon: "✅"
    },
    {
      title: "Custom Experience",
      description: "Tailored solutions for your specific needs",
      icon: "🛠"
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Create Profile",
      description: "Set up your account and customize your preferences"
    },
    {
      number: "2",
      title: "Choose Role",
      description: "Select between buyer or seller interface"
    },
    {
      number: "3",
      title: "Handle Operations",
      description: "Manage payments and logistics seamlessly"
    },
    {
      number: "4",
      title: "Track Orders",
      description: "Monitor your transactions 24/7"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "/path-to-sarah-image.jpg",
      quote: "TradeFlow has revolutionized how we handle international trade. The platform is intuitive and the support is exceptional."
    },
    {
      name: "Michael Chen",
      role: "Import/Export Manager",
      image: "/path-to-michael-image.jpg",
      quote: "The real-time tracking and compliance features have saved us countless hours and reduced our operational costs significantly."
    },
    {
      name: "Emma Rodriguez",
      role: "Logistics Coordinator",
      image: "/path-to-emma-image.jpg",
      quote: "Documentation and compliance used to be a nightmare. With TradeFlow, everything is streamlined and automated."
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section - Full Screen with Better Visual Hierarchy */}
      <div className="relative min-h-screen bg-cover bg-center bg-fixed" 
           style={{ backgroundImage: `url(${importExport})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-4">
                <h1 className="text-7xl font-bold text-white leading-tight animate-fade-in">
                  Empowering MSMEs in 
                  <span className="text-blue-500"> Cross-Border Trade</span>
              </h1>
                <p className="text-xl text-gray-300 animate-fade-in-delay">
                Streamline your international trade operations with our efficient and tailored solutions for small and medium enterprises.
              </p>
              </div>
              
              <div className="flex gap-6 animate-fade-in-delay">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:translate-y-[-2px] transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                  Join Now
                </button>
                <button className="px-8 py-4 bg-white/10 text-white rounded-lg backdrop-blur-sm hover:bg-white/20 transform hover:translate-y-[-2px] transition-all duration-300">
                  Discover More
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-12 max-w-2xl animate-fade-in-delay">
                <div className="group cursor-pointer">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl">
                        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">Seller Portal</h3>
                        <p className="text-sm text-gray-300">Manage your listings</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl">
                        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">Buyer Portal</h3>
                        <p className="text-sm text-gray-300">Browse products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Modern Card Design */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Why Choose TradeFlow</h2>
            <p className="text-gray-600 text-lg">Experience seamless international trade with our comprehensive solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} 
                   className="group p-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-200 transition-colors">
                  {feature.icon}
                </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with Slide In */}
      <section id="steps" className={`py-24 bg-gray-50 transition-all duration-1000 ${
        isVisible.steps ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl text-white bg-blue-600 rounded-full">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className={`py-24 bg-white transition-all duration-1000 ${
        isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="flex items-center justify-center gap-1 mb-12">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">4.5/5 from 2500+ reviews</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings with Hover Effects */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Enhanced For Buyers section */}
            <div className="group">
              <h3 className="text-2xl mb-8 font-semibold">For Buyers</h3>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Electronics</h4>
                    <p className="text-sm text-gray-600">5000+ listings</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Browse Products
              </button>
            </div>

            {/* Enhanced For Sellers section */}
            <div className="group">
              <h3 className="text-2xl mb-8 font-semibold">For Sellers</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Top Sellers</h4>
                      <p className="text-sm text-gray-600">View rankings</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">New Listings</h4>
                      <p className="text-sm text-gray-600">Fresh opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                List Your Product
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section with Enhanced Interaction */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">See TradeFlow in Action</h2>
          <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl group">
            <img 
              src="/path-to-video-thumbnail.jpg" 
              alt="TradeFlow Demo" 
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors">
                <svg className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Add these animations to your CSS
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s forwards;
  opacity: 0;
}
`;

export default Home
