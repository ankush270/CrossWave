import { 
  FaMicrochip, FaMobile, FaHome, FaTv, FaLaptop, 
  FaBlender, FaFan, FaCamera, FaHeadphones, FaTablet,
  FaDesktop, FaPrint, FaGamepad, FaMusic
} from 'react-icons/fa';

export const categories = {
  all: {
    name: 'All Products',
    icon: FaMicrochip,
    subcategories: []
  },
  smartphones: {
    name: 'Smartphones & Tablets',
    icon: FaMobile,
    subcategories: ['Mobile Phones', 'Tablets', 'Accessories', 'Spare Parts']
  },
  homeAppliances: {
    name: 'Home Appliances',
    icon: FaHome,
    subcategories: [
      'Refrigerators',
      'Washing Machines',
      'Air Conditioners',
      'Microwave Ovens',
      'Dishwashers'
    ]
  },
  entertainment: {
    name: 'Entertainment',
    icon: FaTv,
    subcategories: [
      'Smart TVs',
      'Home Theater Systems',
      'Gaming Consoles',
      'Streaming Devices'
    ]
  },
  computers: {
    name: 'Computers & Laptops',
    icon: FaLaptop,
    subcategories: [
      'Laptops',
      'Desktop PCs',
      'Monitors',
      'Printers & Scanners',
      'Computer Parts'
    ]
  },
  kitchenAppliances: {
    name: 'Kitchen Appliances',
    icon: FaBlender,
    subcategories: [
      'Food Processors',
      'Mixers & Grinders',
      'Electric Kettles',
      'Induction Cooktops',
      'Coffee Makers'
    ]
  },
  cooling: {
    name: 'Cooling Solutions',
    icon: FaFan,
    subcategories: [
      'Air Conditioners',
      'Air Coolers',
      'Ceiling Fans',
      'Exhaust Fans',
      'Industrial Cooling'
    ]
  },
  cameras: {
    name: 'Cameras & Imaging',
    icon: FaCamera,
    subcategories: [
      'DSLR Cameras',
      'Mirrorless Cameras',
      'Security Cameras',
      'Action Cameras',
      'Camera Accessories'
    ]
  },
  audio: {
    name: 'Audio Devices',
    icon: FaHeadphones,
    subcategories: [
      'Headphones',
      'Speakers',
      'Sound Systems',
      'Microphones',
      'Audio Accessories'
    ]
  },
  tablets: {
    name: 'Tablets & E-readers',
    icon: FaTablet,
    subcategories: [
      'iPads',
      'Android Tablets',
      'E-readers',
      'Tablet Accessories',
      'Drawing Tablets'
    ]
  },
  gaming: {
    name: 'Gaming & VR',
    icon: FaGamepad,
    subcategories: [
      'Gaming Consoles',
      'VR Headsets',
      'Gaming Accessories',
      'Gaming Components',
      'Gaming Monitors'
    ]
  }
}; 