import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import img1 from '../assets/rb_1.png'
import img2 from '../assets/rb_2.png'
import img3 from '../assets/rb_3.png'
import c1 from '../assets/c1.png'
import c2 from '../assets/c2.png'
import c3 from '../assets/c3.png'
import importExport from '../assets/import-export.jpg'
import { 
  FaRocket, FaShieldAlt, FaGlobe, FaChartLine,
  FaArrowRight, FaPlay, FaCheck, FaUserCheck,
  FaTruck, FaHeadset, FaLock, FaHandshake,
  FaShip, FaFileContract, FaMoneyCheckAlt, FaWarehouse,
  FaFileInvoiceDollar, FaUserTie, FaBox, FaTshirt, FaCar, FaIndustry, FaClock,
  FaMicrochip, FaMobile, FaMemory, FaMicrophone, FaCheckCircle, FaLaptop, FaDesktop, 
  FaKeyboard, FaHdd, FaServer, FaWifi, FaStar, FaQuoteLeft, FaBook
} from 'react-icons/fa'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import FeaturedListings from '../components/home/FeaturedListings'
import VideoSection from '../components/home/VideoSection'

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    steps: false,
    testimonials: false
  });

  // Add these scroll animations
  const { scrollY } = useScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -150])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  
  // Spring animations for smoother effects
  const springConfig = { stiffness: 100, damping: 30, bounce: 0 }
  const scaleSpring = useSpring(1, springConfig)
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollProgress(latest)
  })

  // Add these animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  // Add hover animations
  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  }

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
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Trade Network",
      description: "Access verified suppliers and buyers across 150+ countries",
      color: "blue",
      stats: "10K+ Active Partners"
    },
    {
      icon: <FaFileContract className="w-8 h-8" />,
      title: "Trade Documentation",
      description: "Automated customs, shipping & compliance documents",
      color: "indigo",
      stats: "99% Compliance Rate"
    },
    {
      icon: <FaMoneyCheckAlt className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Letter of Credit, Bank Transfers & Trade Finance",
      color: "green",
      stats: "$500M+ Processed"
    },
    {
      icon: <FaShip className="w-8 h-8" />,
      title: "Logistics Management",
      description: "End-to-end shipping & freight management",
      color: "purple",
      stats: "5M+ Shipments"
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
      image: img1,
      quote: "TradeFlow has revolutionized how we handle international trade. The platform is intuitive and the support is exceptional.",
      companyLogo: c1
    },
    {
      name: "Michael Chen",
      role: "Import/Export Manager",
      image: img2,
      quote: "The real-time tracking and compliance features have saved us countless hours and reduced our operational costs significantly.",
      companyLogo:c2
    },
    {
      name: "Emma Rodriguez",
      role: "Logistics Coordinator",
      image: img3,
      quote: "Documentation and compliance used to be a nightmare. With TradeFlow, everything is streamlined and automated.",
      companyLogo: c3
    }
  ]

  return (
    <div className="relative">
      <Hero />
      <Features isVisible={isVisible.features} />
      <HowItWorks isVisible={isVisible.steps} />
      <Testimonials testimonials={testimonials} />
      <FeaturedListings />
      <VideoSection />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-0 left-0 h-1 bg-blue-600"
        style={{
          width: `${(scrollProgress / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
          zIndex: 50
        }}
      />
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

.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.scale-on-scroll {
  transform: scale(var(--scroll-scale));
}
`;

export default Home
