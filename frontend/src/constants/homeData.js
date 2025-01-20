export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: img1,
    quote: "TradeFlow has revolutionized how we handle international trade. The platform is intuitive and the support is exceptional.",
    companyLogo: c1
  },
  // ... other testimonials
]

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
} 