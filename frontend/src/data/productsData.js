import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';

export const productsData = [
  {
    id: 1,
    name: "Samsung 4K Smart TV",
    overview: "Premium 4K Smart TV with QLED technology and advanced features",
    category: "entertainment",
    stock: 100,
    image: p3,
    images: [p2, p1, p3],
    origin: "South Korea",
    moq: 10,
    pricing: {
      sample: {
        price: 899,
        moq: 1,
        features: [
          "Basic warranty",
          "Standard shipping",
          "Basic installation guide"
        ]
      },
      subcategory: "Smart TVs",
      standard: {
        price: 849,
        moq: 10,
        features: [
          "Extended warranty",
          "Priority shipping",
          "Professional installation",
          "Technical support"
        ]
      },
      premium: {
        price: 799,
        moq: 50,
        features: [
          "Premium warranty",
          "Express shipping",
          "White glove installation",
          "24/7 Technical support",
          "Bulk discount"
        ]
      }
    },
    specifications: {
      technical: [
        { key: "Display Technology", value: "QLED" },
        { key: "Resolution", value: "3840 x 2160 (4K)" },
        { key: "Refresh Rate", value: "120Hz" },
        { key: "HDR", value: "HDR10+" }
      ],
      physical: [
        { key: "Screen Size", value: "55 inches" },
        { key: "Weight", value: "17.2 kg" },
        { key: "Dimensions", value: "1225 x 705 x 63.2 mm" },
        { key: "VESA Mount", value: "400 x 400 mm" }
      ]
    },
    seller_id: "samsung123",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-10")
  },
  {
    id: 2,
    name: "Dell XPS 15 Laptop",
    overview: "High-performance laptop with 4K display and latest Intel processor",
    category: "computers",
    stock: 50,
    image: p4,
    images: [p4, p1, p2],
    origin: "USA",
    moq: 5,
    pricing: {
      sample: {
        price: 1599,
        moq: 1,
        features: [
          "Standard warranty",
          "Basic support",
          "Standard shipping"
        ]
      },
      subcategory: "Premium Laptops",
      standard: {
        price: 1549,
        moq: 5,
        features: [
          "Extended warranty",
          "Priority support",
          "Express shipping",
          "Software package"
        ]
      },
      premium: {
        price: 1499,
        moq: 20,
        features: [
          "Premium warranty",
          "24/7 support",
          "Next-day shipping",
          "Enterprise software suite",
          "Custom configuration"
        ]
      }
    },
    specifications: {
      technical: [
        { key: "Processor", value: "Intel Core i7-12700H" },
        { key: "RAM", value: "16GB DDR5" },
        { key: "Storage", value: "512GB NVMe SSD" },
        { key: "Graphics", value: "NVIDIA RTX 3050 Ti" }
      ],
      physical: [
        { key: "Display", value: "15.6-inch 4K OLED" },
        { key: "Weight", value: "1.96 kg" },
        { key: "Dimensions", value: "354 x 235 x 18 mm" },
        { key: "Battery", value: "86Whr" }
      ]
    },
    seller_id: "dell456",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-15")
  },
  {
    id: 3,
    name: "LG 1.5 Ton Inverter AC",
    category: "home appliances",
    subcategory: "Air Conditioners",
    image: p1,
    images: [p1, p2, p3],
    price: {
      sample: "$599/unit",
      bulk: "$549/unit",
    },
    moq: 10,
    origin: "South Korea",
    rating: 4.7,
    certifications: ["CE", "Energy Star"],
    leadTime: "20-25 days",
    specifications: {
      technical: {
        capacity: "1.5 Ton",
        technology: "Dual Inverter",
        coolingCapacity: "5000W",
        powerConsumption: "1400W",
        noiseLevel: "40 dB",
      },
      physical: {
        dimensions: "837 x 308 x 189 mm",
        weight: "9 kg",
        color: "White",
      },
    },
    pricing: {
      sample: {
        quantity: "1-9 units",
        price: "$599/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "10-49 units",
        price: "$579/unit",
        moq: "10 units",
        features: ["Priority shipping", "Extended support"],
      },
      premium: {
        quantity: "50+ units",
        price: "$549/unit",
        moq: "50 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "Growing",
      demand: "High",
      marketShare: "18%",
      yearOverYear: "+20%",
    },
  },
  {
    id: 4,
    name: "Apple AirPods Pro",
    category: "audio devices",
    subcategory: "Headphones",
    image: p4,
    images: [p4, p1, p2],
    price: {
      sample: "$249/unit",
      bulk: "$229/unit",
    },
    moq: 20,
    origin: "USA",
    rating: 4.9,
    certifications: ["FCC", "CE"],
    leadTime: "7-10 days",
    specifications: {
      technical: {
        type: "In-Ear",
        noiseCancellation: "Active",
        batteryLife: "24 Hours",
        connectivity: "Bluetooth 5.0",
        compatibility: "iOS/Android",
      },
      physical: {
        dimensions: "30.9 x 21.8 x 24 mm",
        weight: "5.4 g",
        color: "White",
      },
    },
    pricing: {
      sample: {
        quantity: "1-19 units",
        price: "$249/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "20-99 units",
        price: "$239/unit",
        moq: "20 units",
        features: ["Priority shipping", "Extended support"],
      },
      premium: {
        quantity: "100+ units",
        price: "$229/unit",
        moq: "100 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "Very High",
      demand: "Extremely High",
      marketShare: "40%",
      yearOverYear: "+30%",
    },
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch 5",
    category: "wearables",
    subcategory: "Smartwatches",
    image: p1,
    images: [p1, p2, p3],
    price: {
      sample: "$299/unit",
      bulk: "$279/unit",
    },
    moq: 50,
    origin: "South Korea",
    rating: 4.6,
    certifications: ["CE", "FCC"],
    leadTime: "10-15 days",
    specifications: {
      technical: {
        display: "1.4-inch AMOLED",
        batteryLife: "2 Days",
        sensors: "Heart Rate, SpO2, GPS",
        connectivity: "Bluetooth, WiFi",
        compatibility: "iOS/Android",
      },
      physical: {
        dimensions: "44 x 44 x 9.8 mm",
        weight: "50 g",
        color: ["Black", "Silver", "Rose Gold"],
      },
    },
    pricing: {
      sample: {
        quantity: "1-49 units",
        price: "$299/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "50-199 units",
        price: "$289/unit",
        moq: "50 units",
        features: ["Priority shipping", "Extended support"],
      },
      premium: {
        quantity: "200+ units",
        price: "$279/unit",
        moq: "200 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "High",
      demand: "Moderate",
      marketShare: "22%",
      yearOverYear: "+18%",
    },
  },
  {
    id: 6,
    name: "Whirlpool Double Door Refrigerator",
    category: "home appliances",
    subcategory: "Refrigerators",
    image: p4,
    images: [p4, p1, p3],
    price: {
      sample: "$1200/unit",
      bulk: "$1100/unit",
    },
    moq: 15,
    origin: "USA",
    rating: 4.7,
    certifications: ["CE", "Energy Star"],
    leadTime: "12-18 days",
    specifications: {
      technical: {
        capacity: "500L",
        technology: "Frost-Free",
        energyConsumption: "400 kWh/year",
        coolingType: "Multi-Airflow",
        inverterCompressor: "Yes",
      },
      physical: {
        dimensions: "177 x 90 x 70 cm",
        weight: "90 kg",
        color: "Stainless Steel",
      },
    },
    pricing: {
      sample: {
        quantity: "1-14 units",
        price: "$1200/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "15-49 units",
        price: "$1150/unit",
        moq: "15 units",
        features: ["Priority shipping", "Extended warranty"],
      },
      premium: {
        quantity: "50+ units",
        price: "$1100/unit",
        moq: "50 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "Stable",
      demand: "Moderate",
      marketShare: "20%",
      yearOverYear: "+10%",
    },
  },
  {
    id: 7,
    name: "Sony WH-1000XM5 Headphones",
    category: "audio devices",
    subcategory: "Headphones",
    image: p3,
    images: [p3, p3, p3],
    price: {
      sample: "$399/unit",
      bulk: "$359/unit",
    },
    moq: 25,
    origin: "Japan",
    rating: 4.9,
    certifications: ["CE", "FCC"],
    leadTime: "8-12 days",
    specifications: {
      technical: {
        type: "Over-Ear",
        noiseCancellation: "Active (ANC)",
        batteryLife: "30 Hours",
        connectivity: "Bluetooth 5.2",
        compatibility: "iOS/Android",
      },
      physical: {
        dimensions: "200 x 180 x 70 mm",
        weight: "250 g",
        color: ["Black", "Silver"],
      },
    },
    pricing: {
      sample: {
        quantity: "1-24 units",
        price: "$399/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "25-99 units",
        price: "$379/unit",
        moq: "25 units",
        features: ["Priority shipping", "Extended support"],
      },
      premium: {
        quantity: "100+ units",
        price: "$359/unit",
        moq: "100 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "Rising",
      demand: "High",
      marketShare: "35%",
      yearOverYear: "+15%",
    },
  },
  {
    id: 8,
    name: "OnePlus 11 5G Smartphone",
    category: "mobile phones",
    subcategory: "Smartphones",
    image: p3,
    images: [p3, p3, p3],
    price: {
      sample: "$749/unit",
      bulk: "$699/unit",
    },
    moq: 50,
    origin: "China",
    rating: 4.8,
    certifications: ["CE", "FCC"],
    leadTime: "15-20 days",
    specifications: {
      technical: {
        processor: "Snapdragon 8 Gen 2",
        RAM: "12GB",
        storage: "256GB",
        display: "6.7-inch AMOLED",
        camera: "50MP Triple Camera",
        battery: "5000mAh",
      },
      physical: {
        dimensions: "163.1 x 74.1 x 8.5 mm",
        weight: "205 g",
        color: ["Black", "Green"],
      },
    },
    pricing: {
      sample: {
        quantity: "1-49 units",
        price: "$749/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "50-199 units",
        price: "$729/unit",
        moq: "50 units",
        features: ["Priority shipping", "Extended warranty"],
      },
      premium: {
        quantity: "200+ units",
        price: "$699/unit",
        moq: "200 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "Surging",
      demand: "Very High",
      marketShare: "25%",
      yearOverYear: "+20%",
    },
  },
  {
    id: 9,
    name: "Philips Air Fryer XXL",
    category: "kitchen appliances",
    subcategory: "Air Fryers",
    image: p3,
    images: [p1, p3, p3],
    price: {
      sample: "$299/unit",
      bulk: "$279/unit",
    },
    moq: 30,
    origin: "Netherlands",
    rating: 4.7,
    certifications: ["CE", "FCC"],
    leadTime: "10-15 days",
    specifications: {
      technical: {
        capacity: "7L",
        power: "1700W",
        temperatureRange: "80-200°C",
        technology: "Rapid Air Technology",
        control: "Digital Touch",
      },
      physical: {
        dimensions: "433 x 321 x 315 mm",
        weight: "8 kg",
        color: "Black",
      },
    },
    pricing: {
      sample: {
        quantity: "1-29 units",
        price: "$299/unit",
        moq: "1 unit",
        features: ["Sample testing", "Basic support"],
      },
      standard: {
        quantity: "30-99 units",
        price: "$289/unit",
        moq: "30 units",
        features: ["Priority shipping", "Extended support"],
      },
      premium: {
        quantity: "100+ units",
        price: "$279/unit",
        moq: "100 units",
        features: ["Maximum discount", "Dedicated support"],
      },
    },
    marketInsights: {
      trend: "Stable",
      demand: "Moderate",
      marketShare: "18%",
      yearOverYear: "+12%",
    },
  },
];
  