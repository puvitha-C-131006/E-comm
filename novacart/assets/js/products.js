/* ==========================================================================
   High-Speed CDN & WebP Image Optimizer Utility
   ========================================================================== */
function getOptimizedImageUrl(url, width = 400, quality = 75) {
    if (!url) return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75&fm=webp';
    if (typeof url === 'string' && url.includes('images.unsplash.com')) {
        const cleanUrl = url.split('?')[0];
        return cleanUrl + '?auto=format&fit=crop&w=' + width + '&q=' + quality + '&fm=webp';
    }
    return url;
}
if (typeof window !== 'undefined') {
    window.getOptimizedImageUrl = getOptimizedImageUrl;
}

/* ==========================================================================
   NovaCart - Expanded Production Catalog Database (Flipkart/Amazon Spec)
   ========================================================================== */

let products = [
  {
    "name": "Apple MacBook Pro 16\" M3 Max (36GB Unified Memory, 1TB SSD)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 249900,
    "discount": 12,
    "rating": 4.9,
    "reviewCount": 342,
    "stock": 25,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Amazon's Choice",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=75&fm=webp",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=75&fm=webp",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=75&fm=webp"
    ],
    "variants": {
      "colors": [
        {
          "name": "Space Black",
          "hex": "#2E2F32"
        },
        {
          "name": "Silver",
          "hex": "#E2E4E5"
        }
      ],
      "sizes": [
        "512GB SSD",
        "1TB SSD",
        "2TB SSD"
      ]
    },
    "ratingBreakdown": {
      "1": 1,
      "2": 1,
      "3": 3,
      "4": 10,
      "5": 85
    },
    "specs": {
      "Processor": "Apple M3 Max 14-core",
      "Memory": "36GB RAM",
      "Display": "16.2\" Liquid Retina XDR",
      "Battery": "Up to 22 Hours"
    },
    "description": "The ultimate pro notebook with blazing M3 Max performance and breathtaking Liquid Retina XDR display.",
    "id": 1
  },
  {
    "name": "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 159900,
    "discount": 8,
    "rating": 4.8,
    "reviewCount": 680,
    "stock": 30,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=75&fm=webp",
    "images": [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=75&fm=webp",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=75&fm=webp"
    ],
    "variants": {
      "colors": [
        {
          "name": "Natural Titanium",
          "hex": "#B8B3A8"
        },
        {
          "name": "Blue Titanium",
          "hex": "#2F3B4B"
        },
        {
          "name": "Black Titanium",
          "hex": "#1C1C1E"
        }
      ],
      "sizes": [
        "256GB",
        "512GB",
        "1TB"
      ]
    },
    "ratingBreakdown": {
      "1": 0,
      "2": 1,
      "3": 2,
      "4": 9,
      "5": 88
    },
    "specs": {
      "Chip": "A17 Pro",
      "Display": "6.7\" Super Retina XDR 120Hz",
      "Camera": "48MP Main + 5x Telephoto",
      "Build": "Titanium Frame"
    },
    "description": "Forged in titanium with groundbreaking A17 Pro performance and next-gen camera zoom system.",
    "id": 2
  },
  {
    "name": "Apple iPad Pro 12.9\" M2 Liquid Retina XDR (256GB Wi-Fi)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 112900,
    "discount": 10,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 20,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "badge": "Top Rated",
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Space Grey",
          "hex": "#4A4D52"
        },
        {
          "name": "Silver",
          "hex": "#E3E4E6"
        }
      ],
      "sizes": [
        "128GB",
        "256GB",
        "512GB"
      ]
    },
    "specs": {
      "Display": "12.9\" Liquid Retina XDR",
      "Chip": "Apple M2 8-core",
      "Camera": "12MP + 10MP with LiDAR"
    },
    "description": "Unmatched performance with Apple Silicon M2, mini-LED display, and Apple Pencil hover.",
    "id": 3,
    "images": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=75&fm=webp",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple AirPods Max Wireless Over-Ear Spatial Audio Headphones",
    "category": "Electronics",
    "brand": "Apple",
    "price": 59900,
    "discount": 15,
    "rating": 4.7,
    "reviewCount": 410,
    "stock": 18,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Space Grey",
          "hex": "#383838"
        },
        {
          "name": "Silver",
          "hex": "#E6E6E6"
        },
        {
          "name": "Sky Blue",
          "hex": "#8DA7B8"
        }
      ],
      "sizes": [
        "One Size"
      ]
    },
    "specs": {
      "Noise Cancellation": "Pro Active Noise Cancellation",
      "Spatial Audio": "Dynamic head tracking",
      "Battery": "20 hours"
    },
    "description": "AirPods Max deliver studio-grade acoustics and exceptional computational audio in a luxury stainless steel chassis.",
    "id": 4,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple Mac Studio M2 Max (32GB Unified Memory, 512GB SSD)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 209900,
    "discount": 7,
    "rating": 4.9,
    "reviewCount": 120,
    "stock": 14,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Silver",
          "hex": "#E0E0E0"
        }
      ],
      "sizes": [
        "512GB",
        "1TB",
        "2TB"
      ]
    },
    "specs": {
      "Processor": "M2 Max 12-core",
      "RAM": "32GB Unified",
      "Ports": "4x Thunderbolt 4, 10Gb Ethernet"
    },
    "description": "Astonishing power in a compact form factor designed for heavy creative workflows.",
    "id": 5,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple Studio Display 27\" 5K Retina (Standard Glass)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 159900,
    "discount": 5,
    "rating": 4.8,
    "reviewCount": 95,
    "stock": 12,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Silver",
          "hex": "#E8E8E8"
        }
      ],
      "sizes": [
        "Tilt Stand",
        "VESA Mount"
      ]
    },
    "specs": {
      "Resolution": "5120x2880 5K Retina",
      "Brightness": "600 nits P3 color",
      "Camera": "12MP Center Stage"
    },
    "description": "A gorgeous 27-inch 5K Retina display with high-fidelity six-speaker sound and studio-quality mics.",
    "id": 6,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple Mac mini M2 Desktop (8-Core CPU, 512GB SSD)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 79900,
    "discount": 11,
    "rating": 4.7,
    "reviewCount": 310,
    "stock": 28,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Silver",
          "hex": "#E0E0E0"
        }
      ],
      "sizes": [
        "256GB SSD",
        "512GB SSD"
      ]
    },
    "specs": {
      "Processor": "Apple M2 8-core",
      "RAM": "8GB Unified",
      "Storage": "512GB SSD"
    },
    "description": "Compact desktop powerhouse offering speed, connectivity, and whisper-quiet operation.",
    "id": 7,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple TV 4K Wi-Fi + Ethernet (128GB Storage, 3rd Gen)",
    "category": "Electronics",
    "brand": "Apple",
    "price": 16900,
    "discount": 9,
    "rating": 4.8,
    "reviewCount": 220,
    "stock": 35,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "128GB Wi-Fi + Ethernet"
      ]
    },
    "specs": {
      "Chip": "A15 Bionic",
      "Video": "4K Dolby Vision, HDR10+",
      "Remote": "Siri Remote USB-C"
    },
    "description": "Cinematic entertainment experience with ultra-fluid app navigation and Smart Home hub functionality.",
    "id": 8,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Galaxy S24 Ultra AI Smartphone 512GB (Titanium Gray)",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 139999,
    "discount": 14,
    "rating": 4.8,
    "reviewCount": 520,
    "stock": 22,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Amazon's Choice",
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Titanium Gray",
          "hex": "#757577"
        },
        {
          "name": "Titanium Black",
          "hex": "#2B2B2B"
        },
        {
          "name": "Titanium Violet",
          "hex": "#5E5368"
        }
      ],
      "sizes": [
        "256GB",
        "512GB",
        "1TB"
      ]
    },
    "specs": {
      "Display": "6.8\" Dynamic AMOLED 2X 120Hz",
      "Camera": "200MP Main + 50MP 5x Telephoto",
      "Processor": "Snapdragon 8 Gen 3",
      "Stylus": "Embedded S Pen"
    },
    "description": "Galaxy AI revolutionizes communication, productivity, and nighttime photography in titanium perfection.",
    "id": 9,
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Galaxy Z Fold 5 5G (512GB, Phantom Black)",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 164999,
    "discount": 18,
    "rating": 4.7,
    "reviewCount": 240,
    "stock": 16,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Phantom Black",
          "hex": "#1C1C1C"
        },
        {
          "name": "Icy Blue",
          "hex": "#B0C4DE"
        }
      ],
      "sizes": [
        "256GB",
        "512GB"
      ]
    },
    "specs": {
      "Main Screen": "7.6\" Dynamic AMOLED 2X 120Hz",
      "Cover Screen": "6.2\" Dynamic AMOLED 2X",
      "Water Resistance": "IPX8"
    },
    "description": "Unfold a massive 7.6-inch tablet-grade screen packed with desktop multitasking power.",
    "id": 10,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Galaxy Tab S9 Ultra (14.6\" Dynamic AMOLED 2X, 256GB)",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 108999,
    "discount": 12,
    "rating": 4.8,
    "reviewCount": 175,
    "stock": 15,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Graphite",
          "hex": "#383838"
        },
        {
          "name": "Beige",
          "hex": "#EAE6DF"
        }
      ],
      "sizes": [
        "256GB",
        "512GB"
      ]
    },
    "specs": {
      "Screen": "14.6\" WQXGA+ AMOLED 120Hz",
      "Stylus": "S Pen Included",
      "Water Resistance": "IP68"
    },
    "description": "Massive 14.6-inch flagship Android tablet for artists, executives, and power users.",
    "id": 11,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung 65\" Neo QLED 4K Smart TV QN90C",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 189990,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 380,
    "stock": 10,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Titan Black",
          "hex": "#1A1A1A"
        }
      ],
      "sizes": [
        "55\"",
        "65\"",
        "75\""
      ]
    },
    "specs": {
      "Display": "Quantum Matrix with Mini LEDs",
      "Refresh Rate": "120Hz (up to 144Hz)",
      "Audio": "Dolby Atmos 60W"
    },
    "description": "Ultra-fine contrast control and realistic picture quality with Quantum Mini LED backlighting.",
    "id": 12,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Galaxy Buds2 Pro Wireless ANC Earbuds",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 14999,
    "discount": 25,
    "rating": 4.6,
    "reviewCount": 460,
    "stock": 50,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Graphite",
          "hex": "#3A3A3A"
        },
        {
          "name": "White",
          "hex": "#FAFAFA"
        },
        {
          "name": "Bora Purple",
          "hex": "#8A6D9B"
        }
      ],
      "sizes": [
        "Standard"
      ]
    },
    "specs": {
      "Audio": "24-bit Hi-Fi",
      "ANC": "Intelligent Active Noise Cancelling",
      "Battery": "Up to 29 hours total"
    },
    "description": "Experience 24-bit studio sound with seamless device switching and crystal-clear call mics.",
    "id": 13,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Odyssey Neo G9 49\" Dual QHD Curved Gaming Monitor",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 175900,
    "discount": 16,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 8,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Glossy Black",
          "hex": "#F2F2F2"
        }
      ],
      "sizes": [
        "49\" 32:9"
      ]
    },
    "specs": {
      "Resolution": "5120x1440 Dual QHD",
      "Curvature": "1000R Curve",
      "Refresh Rate": "240Hz 1ms"
    },
    "description": "Next-generation quantum mini-LED ultrawide curved monitor for breathtaking immersion.",
    "id": 14,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung ViewFinity S9 27\" 5K Matte Display",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 124999,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 110,
    "stock": 12,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Silver Metal",
          "hex": "#DCDCDC"
        }
      ],
      "sizes": [
        "27\" 5K"
      ]
    },
    "specs": {
      "Resolution": "5120x2880 5K IPS",
      "Color": "99% DCI-P3 Delta E < 2",
      "Camera": "4K SlimFit Cam"
    },
    "description": "Factory color-calibrated 5K monitor engineered for video editors and creative photographers.",
    "id": 15,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    "category": "Electronics",
    "brand": "Sony",
    "price": 29990,
    "discount": 18,
    "rating": 4.8,
    "reviewCount": 512,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Midnight Black",
          "hex": "#1A1A1A"
        },
        {
          "name": "Silver White",
          "hex": "#E8E6E1"
        }
      ],
      "sizes": [
        "Standard"
      ]
    },
    "specs": {
      "Noise Cancellation": "Auto NC Optimizer with 8 mics",
      "Battery": "30 hours with fast charge",
      "Weight": "250g"
    },
    "description": "Unrivaled active noise cancellation with high-resolution wireless LDAC audio certification.",
    "id": 16,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony WF-1000XM5 Truly Wireless Noise Canceling Earbuds",
    "category": "Electronics",
    "brand": "Sony",
    "price": 24990,
    "discount": 16,
    "rating": 4.7,
    "reviewCount": 380,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#111111"
        },
        {
          "name": "Silver",
          "hex": "#EDEDED"
        }
      ],
      "sizes": [
        "Standard"
      ]
    },
    "specs": {
      "Driver": "Dynamic Driver X",
      "Noise Canceling": "QN2e + V2 dual processors",
      "Battery": "24h with case"
    },
    "description": "Precision-engineered sound and top-tier noise isolation with deep punchy bass.",
    "id": 17,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony Alpha 7 IV Full-Frame Mirrorless Camera (Body Only)",
    "category": "Electronics",
    "brand": "Sony",
    "price": 219990,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 210,
    "stock": 15,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#1B1B1B"
        }
      ],
      "sizes": [
        "Body Only",
        "With 28-70mm Kit"
      ]
    },
    "specs": {
      "Sensor": "33MP Full-Frame Exmor R CMOS",
      "Video": "4K 60p 10-bit 4:2:2",
      "Autofocus": "759-point Phase AF"
    },
    "description": "The gold standard hybrid full-frame camera for professional photography and cinema recording.",
    "id": 18,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony Bravia XR 65\" 4K Ultra HD Smart OLED TV (A80L)",
    "category": "Electronics",
    "brand": "Sony",
    "price": 239990,
    "discount": 20,
    "rating": 4.9,
    "reviewCount": 290,
    "stock": 9,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Dark Silver",
          "hex": "#2C2C2C"
        }
      ],
      "sizes": [
        "55\"",
        "65\"",
        "77\""
      ]
    },
    "specs": {
      "Panel": "Cognitive Processor XR OLED",
      "Audio": "Acoustic Surface Audio+",
      "Gaming": "Auto HDR Tone Mapping for PS5"
    },
    "description": "Pure blacks and luminous natural color with screen-vibrating acoustic surface sound.",
    "id": 19,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony HT-A7000 7.1.2ch Dolby Atmos Flagship Soundbar",
    "category": "Electronics",
    "brand": "Sony",
    "price": 99990,
    "discount": 17,
    "rating": 4.7,
    "reviewCount": 160,
    "stock": 14,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#151515"
        }
      ],
      "sizes": [
        "Soundbar Only",
        "With Subwoofer Kit"
      ]
    },
    "specs": {
      "Audio": "7.1.2 Channels with upward-firing speakers",
      "Surround": "360 Spatial Sound Mapping",
      "Pass-through": "8K / 4K 120Hz"
    },
    "description": "Envelop your living space in three-dimensional spatial sound that moves around you.",
    "id": 20,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony SRS-RA5000 Premium Wireless Ambient Sound Speaker",
    "category": "Electronics",
    "brand": "Sony",
    "price": 49990,
    "discount": 15,
    "rating": 4.6,
    "reviewCount": 110,
    "stock": 16,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / Copper",
          "hex": "#1F1F1F"
        }
      ],
      "sizes": [
        "Home Speaker"
      ]
    },
    "specs": {
      "Acoustics": "3 up-firing + 3 mid-range + 1 subwoofer",
      "Technology": "360 Reality Audio",
      "Connectivity": "Wi-Fi, Bluetooth, AirPlay 2"
    },
    "description": "Ambient room-filling audio designed to seamlessly fill entire living rooms with acoustic warmth.",
    "id": 21,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech MX Master 3S Wireless Performance Mouse",
    "category": "Electronics",
    "brand": "Logitech",
    "price": 9495,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 890,
    "stock": 60,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Amazon's Choice",
    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Graphite",
          "hex": "#3A3D40"
        },
        {
          "name": "Pale Grey",
          "hex": "#EAEAEA"
        }
      ],
      "sizes": [
        "Standard"
      ]
    },
    "specs": {
      "Sensor": "8K DPI Any-surface tracking",
      "Scroll": "MagSpeed 1000 lines/sec",
      "Clicks": "90% quieter clicks"
    },
    "description": "Ergonomic masterwork mouse with electromagnetic scrolling wheel and customizable gesture button.",
    "id": 22,
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips Fidelio X3 Hi-Res Open-Back Studio Headphones",
    "category": "Electronics",
    "brand": "Philips",
    "price": 21990,
    "discount": 30,
    "rating": 4.7,
    "reviewCount": 140,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Charcoal Black with Muirhead Leather",
          "hex": "#222222"
        }
      ],
      "sizes": [
        "Studio Over-Ear"
      ]
    },
    "specs": {
      "Acoustic": "Open-Back with Kvadrat fabric",
      "Driver": "50mm high-res multi-layer diaphragms",
      "Frequency": "5 - 40,000 Hz"
    },
    "description": "Audiophile-grade open-back headphones engineered for expansive soundstages and pristine acoustic clarity.",
    "id": 23,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Sportswear Tech Fleece Full-Zip Windrunner Jacket",
    "category": "Fashion",
    "brand": "Nike",
    "price": 6495,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 210,
    "stock": 45,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Dark Grey Heather",
          "hex": "#5C5C5C"
        },
        {
          "name": "Triple Black",
          "hex": "#181818"
        },
        {
          "name": "Khaki Olive",
          "hex": "#556B2F"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ]
    },
    "specs": {
      "Fabric": "53% Cotton, 47% Polyester",
      "Fit": "Tailored Athletic",
      "Pockets": "Zippered sleeve pocket"
    },
    "description": "Signature lightweight thermal warmth with sleek chevron styling and structured street fit.",
    "id": 24,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Club Fleece Brushed-Back Pullover Hoodie",
    "category": "Fashion",
    "brand": "Nike",
    "price": 3495,
    "discount": 15,
    "rating": 4.6,
    "reviewCount": 380,
    "stock": 65,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / White",
          "hex": "#111111"
        },
        {
          "name": "Heather Grey",
          "hex": "#7D7D7D"
        },
        {
          "name": "Midnight Navy",
          "hex": "#1B2838"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Material": "80% Cotton, 20% Polyester fleece",
      "Hood": "Drawstring adjustable",
      "Pocket": "Kangaroo pouch"
    },
    "description": "Ultra-soft brushed fleece provides cozy comfort for everyday workouts and casual lounging.",
    "id": 25,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Dri-FIT ADV Performance Tracksuit Set",
    "category": "Fashion",
    "brand": "Nike",
    "price": 8995,
    "discount": 25,
    "rating": 4.8,
    "reviewCount": 140,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Obsidian / Volt",
          "hex": "#1A2536"
        },
        {
          "name": "Black / Reflective Silver",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Technology": "Nike Dri-FIT moisture wicking",
      "Design": "Aerodynamic athletic cut",
      "Zipper": "Ankle zips for quick changes"
    },
    "description": "High-performance training tracksuit engineered for breathability and full range of movement.",
    "id": 26,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Originals Beckenbauer Classic Track Jacket",
    "category": "Fashion",
    "brand": "Adidas",
    "price": 5999,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 230,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Collegiate Green / White",
          "hex": "#1C4D35"
        },
        {
          "name": "Black / White",
          "hex": "#1A1A1A"
        },
        {
          "name": "Night Indigo",
          "hex": "#1A233A"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Heritage": "Iconic 3-Stripes and Trefoil embroidery",
      "Material": "Heavyweight cotton blend piqué",
      "Collar": "Stand-up retro ribbed collar"
    },
    "description": "An archival classic reborn with timeless 3-Stripes detailing and tailored streetwear fit.",
    "id": 27,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Adicolor Classics Trefoil French Terry Hoodie",
    "category": "Fashion",
    "brand": "Adidas",
    "price": 4599,
    "discount": 18,
    "rating": 4.6,
    "reviewCount": 310,
    "stock": 50,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cloud White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Core Black",
          "hex": "#111111"
        },
        {
          "name": "Wonder Blue",
          "hex": "#4A789C"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ]
    },
    "specs": {
      "Fabric": "100% Better Cotton French Terry",
      "Fit": "Regular comfortable fit",
      "Cuffs": "Ribbed cuffs and hem"
    },
    "description": "Authentic retro hoodie featuring the bold Trefoil front graphic in premium all-day French terry.",
    "id": 28,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Tiro 23 League Athletic Training Pants",
    "category": "Fashion",
    "brand": "Adidas",
    "price": 2999,
    "discount": 25,
    "rating": 4.8,
    "reviewCount": 420,
    "stock": 55,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / White Stripes",
          "hex": "#121212"
        },
        {
          "name": "Team Navy Blue",
          "hex": "#1B2B48"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Technology": "AEROREADY moisture management",
      "Cut": "Tapered lower leg with ankle zips",
      "Pockets": "Side seam zip pockets"
    },
    "description": "The soccer-inspired training pants loved by millions for their crisp tapered profile and breathable comfort.",
    "id": 29,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma T7 Iconic Track Jacket with Chevron Stripes",
    "category": "Fashion",
    "brand": "Puma",
    "price": 4499,
    "discount": 30,
    "rating": 4.6,
    "reviewCount": 190,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Puma Black",
          "hex": "#151515"
        },
        {
          "name": "Puma Red",
          "hex": "#C8102E"
        },
        {
          "name": "Vaporous Grey",
          "hex": "#D6D6D6"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Style": "Signature 7cm T7 stripes",
      "Material": "Recycled polyester blend",
      "Closure": "Full metal front zip"
    },
    "description": "A heritage track jacket straight from the 70s track fields with iconic contrast sleeve panels.",
    "id": 30,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Essentials Big Logo Fleece Sweatshirt",
    "category": "Fashion",
    "brand": "Puma",
    "price": 2499,
    "discount": 28,
    "rating": 4.5,
    "reviewCount": 260,
    "stock": 60,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Medium Grey Heather",
          "hex": "#6E6E6E"
        },
        {
          "name": "Puma White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Peacoat Navy",
          "hex": "#1A2436"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Fabric": "Cotton & recycled fleece",
      "Neck": "Ribbed crewneck collar",
      "Print": "Durable rubberized Puma No. 1 logo"
    },
    "description": "Classic casual crewneck fleece pullover built for warmth, durability, and everyday sportswear styling.",
    "id": 31,
    "badge": "28% OFF",
    "images": [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma BMW M Motorsport Statement Race Jacket",
    "category": "Fashion",
    "brand": "Puma",
    "price": 8999,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 110,
    "stock": 20,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Puma Black with M Stripe",
          "hex": "#121212"
        },
        {
          "name": "Pro White",
          "hex": "#F5F5F5"
        }
      ],
      "sizes": [
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Branding": "Official BMW M Motorsport silicone badge",
      "Protection": "Water repellent shell",
      "Pockets": "Ergonomic zipped pockets"
    },
    "description": "Engineered for high-speed motorsport enthusiasts with authentic BMW M tri-color detailing and track aerodynamics.",
    "id": 32,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Classics T7 Relaxed Sweatpants",
    "category": "Fashion",
    "brand": "Puma",
    "price": 3299,
    "discount": 25,
    "rating": 4.6,
    "reviewCount": 175,
    "stock": 45,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Puma Black / White",
          "hex": "#141414"
        },
        {
          "name": "Dusty Tan",
          "hex": "#B89B72"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Waist": "Elastic waistband with external drawcord",
      "Inseam": "T7 side panels",
      "Pockets": "Dual side slip pockets"
    },
    "description": "Relaxed fit sweatpants with vintage track panel heritage for supreme daily streetwear comfort.",
    "id": 33,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Tailored Double-Breasted Wool Blend Overcoat",
    "category": "Fashion",
    "brand": "Zara",
    "price": 9990,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 165,
    "stock": 22,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Camel Tan",
          "hex": "#C19A6B"
        },
        {
          "name": "Charcoal Grey",
          "hex": "#383B3E"
        },
        {
          "name": "Midnight Black",
          "hex": "#151515"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Composition": "65% Wool, 30% Polyamide, 5% Cashmere",
      "Lapel": "Notched peak lapel",
      "Lining": "100% Viscose smooth lining"
    },
    "description": "Impeccably tailored longline overcoat with structured shoulders and double-breasted horn buttons.",
    "id": 34,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Oversized 100% Linen Button-Up Shirt",
    "category": "Fashion",
    "brand": "Zara",
    "price": 3590,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 280,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Optic White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Sage Green",
          "hex": "#9CAF88"
        },
        {
          "name": "Sky Blue",
          "hex": "#87CEEB"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Fabric": "100% European Flax Linen",
      "Collar": "Spread collar with mother-of-pearl buttons",
      "Fit": "Relaxed breezy silhouette"
    },
    "description": "Breathable pure linen summer shirt tailored for an effortless Mediterranean resort silhouette.",
    "id": 35,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Faux Leather Biker Jacket with Silver Hardware",
    "category": "Fashion",
    "brand": "Zara",
    "price": 6990,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 220,
    "stock": 28,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Washed Black",
          "hex": "#1C1C1C"
        },
        {
          "name": "Dark Chocolate",
          "hex": "#3B271A"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Material": "Premium Vegan PU Leather",
      "Hardware": "Heavy-gauge metal asymmetric zippers",
      "Detail": "Snap-down lapels and waist belt"
    },
    "description": "Classic rock-and-roll moto jacket with asymmetric front zip, epaulettes, and belted hem.",
    "id": 36,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Structured Double-Breasted Suit Blazer",
    "category": "Fashion",
    "brand": "Zara",
    "price": 7990,
    "discount": 20,
    "rating": 4.6,
    "reviewCount": 150,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Navy Blue",
          "hex": "#1E2A38"
        },
        {
          "name": "Taupe Beige",
          "hex": "#B3A99B"
        }
      ],
      "sizes": [
        "38R",
        "40R",
        "42R",
        "44R"
      ]
    },
    "specs": {
      "Cut": "Slim-fit structured silhouette",
      "Buttons": "Six-button front closure",
      "Pockets": "Flap waist pockets and chest welt pocket"
    },
    "description": "Refined sartorial blazer combining Italian tailoring sensibilities with contemporary modern cuts.",
    "id": 37,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Ribbed Knit Cashmere-Blend Crewneck Sweater",
    "category": "Fashion",
    "brand": "Zara",
    "price": 4990,
    "discount": 25,
    "rating": 4.8,
    "reviewCount": 195,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Oatmeal Melange",
          "hex": "#DFD8CD"
        },
        {
          "name": "Forest Green",
          "hex": "#23412E"
        },
        {
          "name": "Charcoal",
          "hex": "#32353A"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Yarn": "90% Fine Merino Wool, 10% Cashmere",
      "Gauge": "Medium 7-gauge ribbed knit",
      "Touch": "Ultra-soft non-itch handfeel"
    },
    "description": "Plush cashmere-blend knit offering sublime softness and elegant winter layering versatility.",
    "id": 38,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Relaxed Pleated Wide-Leg Trousers",
    "category": "Fashion",
    "brand": "Zara",
    "price": 3990,
    "discount": 15,
    "rating": 4.6,
    "reviewCount": 230,
    "stock": 45,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Khaki Grey",
          "hex": "#8A8D8F"
        },
        {
          "name": "Jet Black",
          "hex": "#111111"
        },
        {
          "name": "Off White",
          "hex": "#F3F2EE"
        }
      ],
      "sizes": [
        "30",
        "32",
        "34",
        "36"
      ]
    },
    "specs": {
      "Pleats": "Double front knife pleats",
      "Rise": "High-rise relaxed taper",
      "Hem": "Clean tailored break"
    },
    "description": "Elevated high-rise trousers featuring sharp front pleats and fluid draping fabric.",
    "id": 39,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Contrast Stitch Denim Trucker Jacket",
    "category": "Fashion",
    "brand": "Zara",
    "price": 4590,
    "discount": 22,
    "rating": 4.7,
    "reviewCount": 180,
    "stock": 30,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Vintage Indigo Wash",
          "hex": "#2D4B75"
        },
        {
          "name": "Washed Black",
          "hex": "#222222"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Denim": "100% Rigid 13oz Cotton Denim",
      "Hardware": "Antique brass branded shank buttons",
      "Stitch": "Tobacco contrast topstitching"
    },
    "description": "Authentic vintage-washed denim jacket crafted from heavyweight durable cotton twill.",
    "id": 40,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Quilted Lightweight Water-Repellent Puffer Jacket",
    "category": "Fashion",
    "brand": "Zara",
    "price": 5990,
    "discount": 28,
    "rating": 4.8,
    "reviewCount": 210,
    "stock": 38,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Matte Black",
          "hex": "#121212"
        },
        {
          "name": "Olive Green",
          "hex": "#475239"
        },
        {
          "name": "Ice Silver",
          "hex": "#D4D9DE"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Filling": "Thermal tech insulation (feather-free)",
      "Shell": "Water-repellent ripstop nylon",
      "Collar": "Stand thermal collar"
    },
    "description": "Ultra-lightweight packable puffer designed for wind protection, water resistance, and cozy warmth.",
    "id": 41,
    "badge": "28% OFF",
    "images": [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Calvin Klein Classic Monogram Crewneck Tee",
    "category": "Fashion",
    "brand": "Calvin Klein",
    "price": 1990,
    "discount": 15,
    "rating": 4.5,
    "reviewCount": 340,
    "stock": 60,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Black",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Material": "100% Organic Pima Cotton",
      "Weight": "180 GSM",
      "Fit": "Regular fit"
    },
    "description": "Premium cotton everyday tee with soft-touch finish and clean chest logo branding.",
    "id": 42,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Tommy Hilfiger Classic Oxford Button-Down Shirt",
    "category": "Fashion",
    "brand": "Tommy Hilfiger",
    "price": 4290,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 290,
    "stock": 35,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Light Blue",
          "hex": "#A4C2E0"
        },
        {
          "name": "White",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "39",
        "40",
        "42",
        "44"
      ]
    },
    "specs": {
      "Weave": "100% Yarn-Dyed Oxford Cotton",
      "Collar": "Button-down collar",
      "Embroidery": "Signature flag on chest"
    },
    "description": "Timeless smart-casual oxford shirt tailored with natural stretch and a crisp silhouette.",
    "id": 43,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Levis Vintage Fit Trucker Jacket",
    "category": "Fashion",
    "brand": "Levi's",
    "price": 5490,
    "discount": 25,
    "rating": 4.8,
    "reviewCount": 410,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Stonewash Indigo",
          "hex": "#3B5998"
        },
        {
          "name": "Rinsed Dark",
          "hex": "#1C2B42"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ]
    },
    "specs": {
      "Fit": "Boxy vintage 90s fit",
      "Details": "Side welt pockets and waist adjusters"
    },
    "description": "The quintessential denim jacket tailored with 90s heritage boxy proportions.",
    "id": 44,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Air Max 270 React Lifestyle Sneaker",
    "category": "Footwear",
    "brand": "Nike",
    "price": 12995,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 220,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "badge": "Trending",
    "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "University Red",
          "hex": "#D32F2F"
        },
        {
          "name": "Triple Black",
          "hex": "#111111"
        },
        {
          "name": "Pure White",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Sole": "Max Air 270 Unit + Nike React Foam",
      "Upper": "Engineered breathable mesh",
      "Closure": "Speed lacing"
    },
    "description": "Nike's first lifestyle Air unit meets the softest, smoothest, and most resilient Nike React foam.",
    "id": 45,
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Air Force 1 '07 Triple White Classic",
    "category": "Footwear",
    "brand": "Nike",
    "price": 8195,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 940,
    "stock": 50,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Triple White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Triple Black",
          "hex": "#121212"
        }
      ],
      "sizes": [
        "UK 6",
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11",
        "UK 12"
      ]
    },
    "specs": {
      "Upper": "Crisp stitched leather overlays",
      "Cushioning": "Encapsulated Nike Air-Sole unit",
      "Tread": "Pivot circle rubber outsole"
    },
    "description": "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on classic stitched leather.",
    "id": 46,
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Air Jordan 1 Retro High OG 'Chicago Lost & Found'",
    "category": "Footwear",
    "brand": "Nike",
    "price": 16995,
    "discount": 12,
    "rating": 4.9,
    "reviewCount": 560,
    "stock": 14,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Iconic Grail",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Varsity Red / White / Black",
          "hex": "#BA0C2F"
        }
      ],
      "sizes": [
        "UK 7.5",
        "UK 8.5",
        "UK 9.5",
        "UK 10.5",
        "UK 11.5"
      ]
    },
    "specs": {
      "Leather": "Aged vintage cracked leather finish",
      "Collar": "Padded high-top support",
      "Branding": "Wings logo on ankle"
    },
    "description": "The sneaker that started it all. Premium high-top silhouette in the immortal Chicago colorway.",
    "id": 47,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Air Zoom Pegasus 40 Daily Road Running Shoes",
    "category": "Footwear",
    "brand": "Nike",
    "price": 10495,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 380,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / White / Iron Grey",
          "hex": "#222222"
        },
        {
          "name": "Racer Blue",
          "hex": "#1E58B0"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Cushioning": "Dual Zoom Air units (forefoot & heel) + React foam",
      "Weight": "288g (Men's UK 9)",
      "Drop": "10mm"
    },
    "description": "A springy ride for every run, the Peg's familiar, just-for-you feel returns to help you accomplish your fitness goals.",
    "id": 48,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Dunk Low Retro 'Panda' Black & White",
    "category": "Footwear",
    "brand": "Nike",
    "price": 8295,
    "discount": 15,
    "rating": 4.8,
    "reviewCount": 820,
    "stock": 28,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / White (Panda)",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "UK 6",
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Upper": "Real leather upper ages to soft perfection",
      "Midsole": "Lightweight foam midsole",
      "Collar": "Padded low-cut collar"
    },
    "description": "Created for the hardwood but taken to the streets, the 80s b-ball icon returns with classic color-blocking.",
    "id": 49,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike ZoomX Vaporfly 3 Marathon Racing Shoes",
    "category": "Footwear",
    "brand": "Nike",
    "price": 20695,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 160,
    "stock": 12,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "badge": "Elite Marathon",
    "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Bright Mango / Metallic Gold",
          "hex": "#FF5F1F"
        },
        {
          "name": "Volt / Electric Green",
          "hex": "#CEFF00"
        }
      ],
      "sizes": [
        "UK 7.5",
        "UK 8.5",
        "UK 9.5",
        "UK 10.5"
      ]
    },
    "specs": {
      "Plate": "Full-length carbon fiber Flyplate",
      "Foam": "Ultra-responsive Nike ZoomX foam",
      "Weight": "198g"
    },
    "description": "Catch 'em if you can. The Nike Vaporfly 3 is built for the chasers, the racers, and the elevated pacers.",
    "id": 50,
    "images": [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Metcon 9 Cross-Training & Weightlifting Shoes",
    "category": "Footwear",
    "brand": "Nike",
    "price": 11895,
    "discount": 22,
    "rating": 4.7,
    "reviewCount": 195,
    "stock": 24,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Smoke Grey / Gum",
          "hex": "#595959"
        },
        {
          "name": "Black / Anthracite",
          "hex": "#1F1F1F"
        }
      ],
      "sizes": [
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Plate": "Larger Hyperlift plate for heavy squats",
      "Rope Wrap": "Extended rubber side wrap for rope climbs",
      "Lace Lock": "Lace lock tab"
    },
    "description": "The gold standard for lifting and high-intensity functional training with a larger Hyperlift heel plate.",
    "id": 51,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Blazer Mid '77 Vintage Suede High-Top",
    "category": "Footwear",
    "brand": "Nike",
    "price": 7995,
    "discount": 18,
    "rating": 4.7,
    "reviewCount": 310,
    "stock": 30,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Black Swoosh",
          "hex": "#FAFAFA"
        },
        {
          "name": "Sail / Pacific Blue",
          "hex": "#F2EBD9"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Tongue": "Exposed foam on vintage tongue",
      "Construction": "Autoclave construction fuses outsole to midsole"
    },
    "description": "Styled for the 70s. Loved in the 80s. Classic in the 90s. Ready for the future.",
    "id": 52,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Ultraboost Light Running Shoes",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 17999,
    "discount": 28,
    "rating": 4.8,
    "reviewCount": 310,
    "stock": 16,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "50% OFF Deal",
    "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Core Black / Solar Red",
          "hex": "#222222"
        },
        {
          "name": "Cloud White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Lucid Blue",
          "hex": "#2E5BFF"
        }
      ],
      "sizes": [
        "UK 7.5",
        "UK 8.5",
        "UK 9.5",
        "UK 10.5"
      ]
    },
    "specs": {
      "Midsole": "Light BOOST (30% lighter)",
      "Upper": "PRIMEKNIT+ textile",
      "Outsole": "Continental Better Rubber"
    },
    "description": "Experience epic energy return with the lightest Ultraboost ever made, engineered with responsive BOOST pellets.",
    "id": 53,
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Samba OG Classic Leather Sneakers",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 10999,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 880,
    "stock": 22,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Global Trend",
    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cloud White / Core Black / Gum",
          "hex": "#F5F5F5"
        },
        {
          "name": "Core Black / Cloud White / Gum",
          "hex": "#141414"
        }
      ],
      "sizes": [
        "UK 6",
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Upper": "Full grain leather with suede T-toe overlay",
      "Outsole": "Low-profile gum rubber sole",
      "Lining": "Soft leather lining"
    },
    "description": "Born on the pitch, the Samba is a timeless icon of street style with signature suede T-toe and gum sole.",
    "id": 54,
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Originals Stan Smith Sustainable Sneakers",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 7999,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 650,
    "stock": 45,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cloud White / Fairway Green",
          "hex": "#FFFFFF"
        },
        {
          "name": "Cloud White / Collegiate Navy",
          "hex": "#FAFAFA"
        }
      ],
      "sizes": [
        "UK 6",
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Material": "PRIMEGREEN recycled upper",
      "Perforations": "Perforated 3-Stripes ventilation",
      "Heel": "Stan Smith signature portrait"
    },
    "description": "Crisp, clean tennis style that has defined minimal sneaker culture across five decades.",
    "id": 55,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Gazelle Indoor Suede Street Sneakers",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 11999,
    "discount": 18,
    "rating": 4.8,
    "reviewCount": 390,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Collegiate Green / White",
          "hex": "#234F32"
        },
        {
          "name": "Semi Blue Burst",
          "hex": "#4B92DB"
        },
        {
          "name": "Scarlet Red",
          "hex": "#D62828"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10"
      ]
    },
    "specs": {
      "Upper": "Premium velvety soft pigskin suede",
      "Sole": "Translucent gum rubber cupsole",
      "Design": "Gold foil Gazelle lettering"
    },
    "description": "The 1968 indoor training icon redesigned with rich velvety suede and translucent gum wrap.",
    "id": 56,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Adizero Adios Pro 3 Marathon Carbon Shoes",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 21999,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 145,
    "stock": 10,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "badge": "World Record Gear",
    "image": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Wonder Blue / Lucid Lemon",
          "hex": "#3A7BD5"
        },
        {
          "name": "Core Black / Solar Red",
          "hex": "#181818"
        }
      ],
      "sizes": [
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Rods": "ENERGYRODS 2.0 carbon infused rods",
      "Foam": "Two layers of resilient Lightstrike Pro",
      "Outsole": "Continental rubber traction"
    },
    "description": "Engineered with athletes to achieve world record marathon performance and explosive transition speed.",
    "id": 57,
    "images": [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas NMD_R1 V3 Futuristic Street Sneakers",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 13999,
    "discount": 30,
    "rating": 4.6,
    "reviewCount": 280,
    "stock": 32,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Core Black / Carbon",
          "hex": "#1A1A1A"
        },
        {
          "name": "Cloud White / Crystal White",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Cushioning": "Full-length BOOST midsole with TPU plugs",
      "Upper": "Engineered textile with transparent TPU wraps"
    },
    "description": "Tactical transparency and signature midsole plugs bring futuristic technical style to city streets.",
    "id": 58,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Forum Low Classic Retro Basketball Shoes",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 8999,
    "discount": 22,
    "rating": 4.7,
    "reviewCount": 310,
    "stock": 35,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cloud White / Royal Blue",
          "hex": "#FAFAFA"
        },
        {
          "name": "White / Shadow Red",
          "hex": "#EAEAEA"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Strap": "Removable hook-and-loop ankle strap",
      "Leather": "Coated leather and synthetic upper"
    },
    "description": "The 84 hardwood b-ball icon with cross ankle strap design and padded basketball cupsole.",
    "id": 59,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Terrex Free Hiker 2 GORE-TEX Hiking Boots",
    "category": "Footwear",
    "brand": "Adidas",
    "price": 19999,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 170,
    "stock": 16,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Core Black / Grey Six",
          "hex": "#222222"
        },
        {
          "name": "Wonder Beige / Olive",
          "hex": "#A89F91"
        }
      ],
      "sizes": [
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Waterproof": "GORE-TEX breathable waterproof membrane",
      "Cushioning": "Full-length BOOST cushioning",
      "Grip": "Continental Rubber lugged outsole"
    },
    "description": "Hike further with confidence in waterproof GORE-TEX protection and responsive BOOST mountain energy.",
    "id": 60,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Velocity Nitro 3 Road Running Shoes",
    "category": "Footwear",
    "brand": "Puma",
    "price": 9999,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 210,
    "stock": 30,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Sun Stream / Sunset Glow",
          "hex": "#FF4500"
        },
        {
          "name": "Puma Black / White",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Foam": "NITROFOAM nitrogen-injected light foam",
      "Outsole": "PUMAGRIP high-traction all-surface rubber",
      "Weight": "264g"
    },
    "description": "Your everyday mileage workhorse with lightweight NITRO nitrogen-infused bounce and PUMAGRIP durability.",
    "id": 61,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma RS-X Efekt Retro Chunky Sneakers",
    "category": "Footwear",
    "brand": "Puma",
    "price": 8999,
    "discount": 30,
    "rating": 4.6,
    "reviewCount": 340,
    "stock": 38,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Feather Grey / Dark Shadow",
          "hex": "#8A8D8F"
        },
        {
          "name": "Puma White / Royal Sapphire",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Cushioning": "Running System (RS) retro shock-absorption",
      "Upper": "Layered mesh with synthetic nubuck overlays"
    },
    "description": "Bold disruptive angular design meets retro 80s Running System cushioning technology.",
    "id": 62,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Suede Classic XXI Low-Top Sneakers",
    "category": "Footwear",
    "brand": "Puma",
    "price": 5999,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 710,
    "stock": 50,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Puma Black / White",
          "hex": "#181818"
        },
        {
          "name": "Peacoat Navy / White",
          "hex": "#1C2D44"
        },
        {
          "name": "High Risk Red",
          "hex": "#C70025"
        }
      ],
      "sizes": [
        "UK 6",
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Upper": "Full 100% suede leather upper",
      "Branding": "Gold metallic foil PUMA Suede callout",
      "Outsole": "Textured rubber sole"
    },
    "description": "The street culture staple worn by b-boys and hip-hop icons since 1968 in plush velvety suede.",
    "id": 63,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Deviate Nitro 2 Carbon Plate Racing Shoes",
    "category": "Footwear",
    "brand": "Puma",
    "price": 15999,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 160,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Elektro Purple / Fizzy Lime",
          "hex": "#6A0DAD"
        },
        {
          "name": "Puma Black / Fire Glow",
          "hex": "#1A1A1A"
        }
      ],
      "sizes": [
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Carbon Plate": "PWRPLATE carbon composite propulsion plate",
      "Foam": "NITRO Elite super-critical foam",
      "Drop": "6mm"
    },
    "description": "Maximum cushioning and maximum speed with a full-length carbon composite plate for half and full marathons.",
    "id": 64,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Slipstream Leather Retro Basketball Sneakers",
    "category": "Footwear",
    "brand": "Puma",
    "price": 7999,
    "discount": 25,
    "rating": 4.6,
    "reviewCount": 220,
    "stock": 35,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Puma White / Parisian Night",
          "hex": "#FAFAFA"
        },
        {
          "name": "Puma Black / Gum",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "UK 7",
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Heritage": "1987 college basketball original",
      "Upper": "Smooth leather with suede formstrip"
    },
    "description": "Re-imagined 1987 basketball heritage sneaker bringing authentic court attitude to current street fits.",
    "id": 65,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Puma Clyde All-Pro Team Basketball Shoes",
    "category": "Footwear",
    "brand": "Puma",
    "price": 8499,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 180,
    "stock": 22,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Puma White / High Risk Red",
          "hex": "#FFFFFF"
        },
        {
          "name": "Triple Black",
          "hex": "#121212"
        }
      ],
      "sizes": [
        "UK 8",
        "UK 9",
        "UK 10",
        "UK 11"
      ]
    },
    "specs": {
      "Cushioning": "ProFoam+ high-rebound EVA",
      "Upper": "Matryx engineered woven upper for lateral containment"
    },
    "description": "Ultra-lightweight court basketball shoes engineered for explosive first-step speed and sharp defensive cuts.",
    "id": 66,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony PlayStation 5 Slim Digital Edition 1TB Console",
    "category": "Gaming",
    "brand": "Sony",
    "price": 44990,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 680,
    "stock": 12,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "badge": "Hot Deal",
    "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Glacier White",
          "hex": "#F5F5F7"
        }
      ],
      "sizes": [
        "1TB Digital",
        "1TB Disc Edition"
      ]
    },
    "specs": {
      "Storage": "1TB Custom Ultra-High Speed SSD",
      "Resolution": "Up to 4K 120Hz / 8K HDR",
      "Controller": "DualSense with Haptics"
    },
    "description": "Next-generation gaming console with ray tracing, 3D Tempest Audio, and lightning fast load times.",
    "id": 67,
    "images": [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony DualSense Edge Wireless Pro Gaming Controller",
    "category": "Gaming",
    "brand": "Sony",
    "price": 18990,
    "discount": 8,
    "rating": 4.8,
    "reviewCount": 210,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Black",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "Pro Controller with Hard Case"
      ]
    },
    "specs": {
      "Customization": "Swappable stick modules and back paddle buttons",
      "Triggers": "Adjustable trigger stop locks"
    },
    "description": "High-performance customizable pro controller engineered to give you an edge in competitive esports.",
    "id": 68,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony PlayStation VR2 Virtual Reality Headset & Sense Controllers",
    "category": "Gaming",
    "brand": "Sony",
    "price": 57999,
    "discount": 12,
    "rating": 4.8,
    "reviewCount": 140,
    "stock": 10,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Black",
          "hex": "#F2F2F2"
        }
      ],
      "sizes": [
        "Standard VR2 Kit"
      ]
    },
    "specs": {
      "Display": "4K HDR OLED (2000x2040 per eye)",
      "Tracking": "Eye tracking + headset feedback haptics",
      "Refresh Rate": "90Hz / 120Hz"
    },
    "description": "Escape into worlds that feel truly real with 4K HDR visuals, groundbreaking headset feedback, and eye tracking.",
    "id": 69,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony INZONE H9 Wireless Flagship Noise-Canceling Gaming Headset",
    "category": "Gaming",
    "brand": "Sony",
    "price": 21990,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 190,
    "stock": 22,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Black (PS5 Match)",
          "hex": "#F5F5F7"
        }
      ],
      "sizes": [
        "Wireless Headset"
      ]
    },
    "specs": {
      "Spatial Audio": "360 Spatial Sound for Gaming",
      "ANC": "Dual Noise Sensor technology",
      "Battery": "32 hours with fast charge"
    },
    "description": "Detect your competition before they see you with 360 spatial sound precision and active noise cancelation.",
    "id": 70,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony PlayStation Portal Remote Player for PS5",
    "category": "Gaming",
    "brand": "Sony",
    "price": 18990,
    "discount": 5,
    "rating": 4.7,
    "reviewCount": 320,
    "stock": 15,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Black",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "8\" LCD Handheld"
      ]
    },
    "specs": {
      "Screen": "8-inch 1080p 60fps LCD Screen",
      "Controls": "Full DualSense haptic feedback integration",
      "Connectivity": "Wi-Fi Remote Play"
    },
    "description": "Play your PS5 console over your home Wi-Fi with console quality controls on a crisp 8-inch Full HD display.",
    "id": 71,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Sony Pulse Elite Wireless Headset with Planar Magnetic Drivers",
    "category": "Gaming",
    "brand": "Sony",
    "price": 12990,
    "discount": 10,
    "rating": 4.8,
    "reviewCount": 240,
    "stock": 30,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Black",
          "hex": "#F5F5F7"
        }
      ],
      "sizes": [
        "Wireless Headset"
      ]
    },
    "specs": {
      "Drivers": "Audiophile planar magnetic drivers",
      "Link": "PlayStation Link ultra-low latency wireless",
      "Mic": "AI noise-rejected retractable mic"
    },
    "description": "Hear extraordinary lifelike game audio with planar magnetic drivers inspired by professional sound studios.",
    "id": 72,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G Pro X Superlight 2 Wireless Gaming Mouse",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 14995,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 540,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Esports Standard",
    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#111111"
        },
        {
          "name": "White",
          "hex": "#FAFAFA"
        },
        {
          "name": "Magenta",
          "hex": "#D60270"
        }
      ],
      "sizes": [
        "60g Ultra-lightweight"
      ]
    },
    "specs": {
      "Weight": "60g ultra-lightweight",
      "Sensor": "HERO 2 32,000 DPI sensor",
      "Switches": "LIGHTFORCE Hybrid optical-mechanical",
      "Polling": "4000Hz wireless report rate"
    },
    "description": "The icon of esports championships remastered with hybrid optical switches and pro-grade tracking.",
    "id": 73,
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G915 LIGHTSPEED Wireless RGB Mechanical Gaming Keyboard",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 19995,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 380,
    "stock": 20,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Carbon Black Metal",
          "hex": "#2B2B2B"
        }
      ],
      "sizes": [
        "GL Tactile",
        "GL Linear",
        "GL Clicky"
      ]
    },
    "specs": {
      "Switches": "Low-profile mechanical switches",
      "Chassis": "Aircraft-grade 5052 aluminum alloy",
      "Battery": "30 hours continuous RGB gaming"
    },
    "description": "A breakthrough in design and engineering featuring pro-grade LIGHTSPEED wireless and low profile switches.",
    "id": 74,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G733 LIGHTSPEED Wireless RGB Gaming Headset",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 12495,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 420,
    "stock": 32,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Lilac / Purple",
          "hex": "#B19CD9"
        },
        {
          "name": "Black",
          "hex": "#151515"
        },
        {
          "name": "White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Blue",
          "hex": "#1E3F66"
        }
      ],
      "sizes": [
        "278g Lightweight"
      ]
    },
    "specs": {
      "Audio": "PRO-G 40mm drivers + DTS Headphone:X 2.0",
      "Weight": "278 grams featherlight",
      "Battery": "Up to 29 hours"
    },
    "description": "Designed for comfort with reversible suspension strap headband, dual-zone LIGHTSYNC RGB, and Blue VO!CE mic filters.",
    "id": 75,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G29 Driving Force Racing Wheel and Pedals",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 29995,
    "discount": 28,
    "rating": 4.8,
    "reviewCount": 650,
    "stock": 14,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black Leather with Blue Accents",
          "hex": "#1A1A1A"
        }
      ],
      "sizes": [
        "Wheel + 3-Pedal Set"
      ]
    },
    "specs": {
      "Force Feedback": "Dual-motor force feedback with helical gears",
      "Leather": "Hand-stitched genuine leather wheel",
      "Rotation": "900-degree lock-to-lock"
    },
    "description": "Definitive sim racing wheel for PlayStation 5, PS4, and PC with dual-motor realistic road feedback.",
    "id": 76,
    "badge": "28% OFF",
    "images": [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G PRO X 2 LIGHTSPEED Wireless Gaming Headset with Graphene",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 22995,
    "discount": 18,
    "rating": 4.9,
    "reviewCount": 190,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#111111"
        },
        {
          "name": "White",
          "hex": "#FAFAFA"
        },
        {
          "name": "Magenta",
          "hex": "#D60270"
        }
      ],
      "sizes": [
        "Pro Headset"
      ]
    },
    "specs": {
      "Drivers": "50mm Graphene drivers for zero distortion",
      "Connectivity": "LIGHTSPEED, Bluetooth, and 3.5mm wired",
      "Battery": "Up to 50 hours on single charge"
    },
    "description": "Designed with the world's best esports players with revolutionary 50mm Graphene audio drivers.",
    "id": 77,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G502 X PLUS Wireless RGB Ergonomic Gaming Mouse",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 13995,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 510,
    "stock": 26,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#121212"
        },
        {
          "name": "White",
          "hex": "#FAFAFA"
        }
      ],
      "sizes": [
        "Standard"
      ]
    },
    "specs": {
      "Switches": "LIGHTFORCE Hybrid Optical-Mechanical",
      "Sensor": "HERO 25K sub-micron tracking",
      "RGB": "8-LED active LIGHTSYNC glow"
    },
    "description": "The world's most popular gaming mouse reinvented with hybrid optical switches and next-gen LIGHTSPEED.",
    "id": 78,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech G PRO TKL Mechanical Esports Gaming Keyboard",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 11495,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 320,
    "stock": 30,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#1A1A1A"
        }
      ],
      "sizes": [
        "GX Blue Clicky",
        "GX Brown Tactile",
        "GX Red Linear"
      ]
    },
    "specs": {
      "Form Factor": "Tenkeyless compact esports design",
      "Cable": "Detachable micro USB cable with 3-pronged design"
    },
    "description": "Compact tenkeyless tournament keyboard built for pro esports players seeking maximum desk space for mouse sweeps.",
    "id": 79,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech Astro A50 X Wireless Gaming Headset with Base Station",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 37995,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 160,
    "stock": 12,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "badge": "Multi-System Flagship",
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#151515"
        },
        {
          "name": "White",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "With HDMI 2.1 Base Station"
      ]
    },
    "specs": {
      "Switching": "PLAYSYNC 3-system switching (Xbox, PS5, PC)",
      "Drivers": "40mm PRO-G Graphene drivers",
      "Video": "HDMI 2.1 4K 120Hz pass-through"
    },
    "description": "The peak of console gaming audio with instant PLAYSYNC one-click switching between Xbox, PS5, and PC.",
    "id": 80,
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Logitech StreamCam Full HD 60fps Creator Webcam",
    "category": "Gaming",
    "brand": "Logitech",
    "price": 11995,
    "discount": 22,
    "rating": 4.6,
    "reviewCount": 290,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Graphite",
          "hex": "#2C2C2C"
        },
        {
          "name": "White",
          "hex": "#F3F3F3"
        }
      ],
      "sizes": [
        "USB-C Mount"
      ]
    },
    "specs": {
      "Resolution": "1080p at 60 fps",
      "Framing": "AI smart auto-focus and facial tracking",
      "Orientation": "Vertical 9:16 video for TikTok/Shorts"
    },
    "description": "Premium creator streaming webcam designed for pristine video clarity on Twitch, YouTube, and OBS.",
    "id": 81,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Odyssey OLED G8 34\" Curved Smart Gaming Monitor",
    "category": "Gaming",
    "brand": "Samsung",
    "price": 109990,
    "discount": 25,
    "rating": 4.8,
    "reviewCount": 180,
    "stock": 12,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Silver Metal Frame",
          "hex": "#C5C5C5"
        }
      ],
      "sizes": [
        "34\" OLED 175Hz"
      ]
    },
    "specs": {
      "Panel": "Quantum Dot OLED with 0.03ms response time",
      "Refresh": "175Hz Ultra WQHD (3440x1440)",
      "Smart": "Samsung Gaming Hub built-in"
    },
    "description": "Mesmerizing OLED contrast with near-instantaneous 0.03ms response times and smart cloud gaming.",
    "id": 82,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple iPad Air M2 11\" (128GB Wi-Fi Gaming & Creative Tablet)",
    "category": "Gaming",
    "brand": "Apple",
    "price": 59900,
    "discount": 8,
    "rating": 4.8,
    "reviewCount": 310,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Space Grey",
          "hex": "#4A4D52"
        },
        {
          "name": "Starlight",
          "hex": "#EAE6DF"
        },
        {
          "name": "Blue",
          "hex": "#9BB4C7"
        },
        {
          "name": "Purple",
          "hex": "#B8ADC4"
        }
      ],
      "sizes": [
        "128GB",
        "256GB",
        "512GB"
      ]
    },
    "specs": {
      "Chip": "Apple M2 chip with 10-core GPU",
      "Display": "11\" Liquid Retina Display with P3 wide color",
      "Gaming": "Hardware accelerated mesh shading"
    },
    "description": "Turbocharged by the M2 chip, iPad Air delivers breakneck gaming performance for AAA mobile titles.",
    "id": 83,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard",
    "category": "Gaming",
    "brand": "Razer",
    "price": 18999,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 220,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black with Underglow RGB",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "Green Clicky",
        "Yellow Linear"
      ]
    },
    "specs": {
      "Dial": "Razer Command Dial with 8 dedicated macro keys",
      "Polling": "True 8000Hz hyperpolling rate",
      "Wrist Rest": "Plush leatherette with underglow"
    },
    "description": "Full-blown battlestation immersion with command dial, underglow RGB lighting, and mechanical switches.",
    "id": 84,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Razer DeathAdder V3 Pro Wireless Ergonomic Esports Mouse",
    "category": "Gaming",
    "brand": "Razer",
    "price": 13999,
    "discount": 18,
    "rating": 4.9,
    "reviewCount": 480,
    "stock": 30,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#1A1A1A"
        },
        {
          "name": "White",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "63g Ultra-lightweight"
      ]
    },
    "specs": {
      "Sensor": "Focus Pro 30K Optical Sensor",
      "Switches": "Optical Mouse Switches Gen-3",
      "Battery": "90 hours continuous play"
    },
    "description": "Legendary ergonomic shape refined in partnership with top esports champions for refined grip and featherweight speed.",
    "id": 85,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "SteelSeries Arctis Nova Pro Wireless Multi-System Gaming Headset",
    "category": "Gaming",
    "brand": "SteelSeries",
    "price": 34999,
    "discount": 15,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 14,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black",
          "hex": "#181818"
        }
      ],
      "sizes": [
        "With Dual Battery Base Station"
      ]
    },
    "specs": {
      "Acoustics": "Nova Pro Acoustic System with Hi-Res Drivers",
      "ANC": "Active Noise Cancellation with 4-mic hybrid",
      "Battery": "Hot-swappable dual battery system"
    },
    "description": "Infinite battery life with hot-swappable dual battery dock and active noise cancellation.",
    "id": 86,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson V15 Detect Cordless Vacuum Cleaner with Laser Fluffy",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 62900,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 380,
    "stock": 14,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "badge": "Dyson Flagship",
    "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Yellow / Iron",
          "hex": "#FFC72C"
        }
      ],
      "sizes": [
        "Complete Extra Edition"
      ]
    },
    "specs": {
      "Suction": "240 AW (Air Watts)",
      "Filtration": "99.99% HEPA filtration down to 0.1 microns",
      "Run Time": "Up to 60 Minutes"
    },
    "description": "Dyson's most powerful, intelligent cordless vacuum with laser illumination that reveals invisible microscopic dust.",
    "id": 87,
    "images": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Purifier Hot+Cool Gen1 Smart Air Purifier & Heater (HP10)",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 49900,
    "discount": 18,
    "rating": 4.8,
    "reviewCount": 220,
    "stock": 20,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Silver",
          "hex": "#EDEDED"
        }
      ],
      "sizes": [
        "3-in-1 Triple Function"
      ]
    },
    "specs": {
      "Filtration": "Fully sealed HEPA H13 filtration removes 99.95% of pollutants",
      "Heating": "Fast room heating with PTC ceramic plates",
      "Oscillation": "350-degree projection"
    },
    "description": "Purifies, heats, and cools you with Air Multiplier technology to circulate cleaned air throughout the entire room.",
    "id": 88,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Airwrap Multi-Styler Complete Long for All Hair Types",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 49900,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 640,
    "stock": 18,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "badge": "Luxury Beauty",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Nickel / Copper",
          "hex": "#B87333"
        },
        {
          "name": "Strawberry Bronze / Blush Pink",
          "hex": "#E8B4B8"
        },
        {
          "name": "Prussian Blue / Rich Copper",
          "hex": "#1B365D"
        }
      ],
      "sizes": [
        "Complete Long Set with Storage Case"
      ]
    },
    "specs": {
      "Motor": "Dyson digital motor V9 creates Coanda airflow",
      "Heat Control": "Intelligent heat control prevents extreme heat damage (below 150°C)"
    },
    "description": "Style with air, not extreme heat. Curls, waves, smooths, and dries with re-engineered Coanda airflow barrels.",
    "id": 89,
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Supersonic Hair Dryer with Magnetic Styling Attachments",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 37900,
    "discount": 12,
    "rating": 4.8,
    "reviewCount": 520,
    "stock": 25,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Iron / Fuchsia",
          "hex": "#C71585"
        },
        {
          "name": "Black / Nickel",
          "hex": "#222222"
        }
      ],
      "sizes": [
        "With 5 Styling Attachments"
      ]
    },
    "specs": {
      "Motor": "110,000 RPM V9 digital motor",
      "Technology": "Air Multiplier high-velocity jet",
      "Attachment": "Flyaway smoother included"
    },
    "description": "Engineered for fast drying with no extreme heat, protecting hair natural shine with intelligent heat regulator.",
    "id": 90,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Omni-glide Ultra-Slim Hard Floor Cordless Vacuum",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 34900,
    "discount": 20,
    "rating": 4.6,
    "reviewCount": 160,
    "stock": 20,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Purple / Iron",
          "hex": "#4B0082"
        }
      ],
      "sizes": [
        "Omnidirectional Fluffy Head"
      ]
    },
    "specs": {
      "Maneuverability": "Articulated neck moves in all directions and lies flat",
      "Rollers": "Dual counter-rotating soft rollers"
    },
    "description": "Dyson's most maneuverable vacuum for hard floors that effortlessly glides around obstacles and under low furniture.",
    "id": 91,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Purifier Big+Quiet Formaldehyde Large Room Purifier",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 79900,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 85,
    "stock": 8,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Bright Nickel / Dark Blue",
          "hex": "#1A2E40"
        }
      ],
      "sizes": [
        "Up to 100m² Coverage"
      ]
    },
    "specs": {
      "Projection": "Projects clean air over 10 meters (32 feet)",
      "Acoustics": "Whisper quiet at only 56 dBA",
      "Destruction": "Permanently destroys formaldehyde"
    },
    "description": "Engineered for large open-plan living spaces to deliver powerful long-range clean air projection quietly.",
    "id": 92,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson V12 Detect Slim Total Clean Cordless Vacuum",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 49900,
    "discount": 16,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 19,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Prussian Blue / Gold",
          "hex": "#1C355E"
        }
      ],
      "sizes": [
        "Slim Lightweight (2.2kg)"
      ]
    },
    "specs": {
      "Weight": "2.2 kg ultra-lightweight body",
      "Power": "Single button power control",
      "Screen": "LCD screen shows scientific proof of clean"
    },
    "description": "Powerful lightweight cordless cleaning with laser dust detection and single-button continuous power.",
    "id": 93,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Corrale Cordless Hair Straightener with Flexible Copper Plates",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 39900,
    "discount": 15,
    "rating": 4.7,
    "reviewCount": 210,
    "stock": 15,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black Nickel / Fuchsia",
          "hex": "#C71585"
        },
        {
          "name": "Copper / Bright Nickel",
          "hex": "#B87333"
        }
      ],
      "sizes": [
        "Cordless Straightener"
      ]
    },
    "specs": {
      "Plates": "Manganese copper alloy flexing plates",
      "Cordless": "Up to 30 minutes cord-free styling",
      "Flight Ready": "Universal voltage and flight-ready tag"
    },
    "description": "The only straightener with flexing copper plates that shape to gather hair, delivering enhanced styling with 50% less damage.",
    "id": 94,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Gen5detect Absolute Smartest Cordless Vacuum",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 69900,
    "discount": 10,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 12,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Iron / Purple",
          "hex": "#4B0082"
        }
      ],
      "sizes": [
        "Max Suction 280 AW"
      ]
    },
    "specs": {
      "Motor": "Gen5 Hyperdymium motor spins at 135,000rpm",
      "Suction": "280 Air Watts maximum power",
      "Run Time": "Up to 70 minutes"
    },
    "description": "Dyson's most advanced cordless vacuum engineered with whole-machine HEPA filtration capturing 99.99% of viruses.",
    "id": 95,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Dyson Zone Air-Purifying Noise Canceling Headphones",
    "category": "Home Appliances",
    "brand": "Dyson",
    "price": 64900,
    "discount": 25,
    "rating": 4.5,
    "reviewCount": 95,
    "stock": 10,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Ultra Blue / Prussian Blue",
          "hex": "#0047AB"
        }
      ],
      "sizes": [
        "Headphones + Contactless Visor"
      ]
    },
    "specs": {
      "Purification": "Dual 2-stage filtration filters city pollution and gases",
      "Audio": "Full audio spectrum with up to 38dB ANC",
      "Battery": "50 hours audio only"
    },
    "description": "Pure audio meets purified air. High-fidelity audio with active noise cancellation and attachable contact-free air visor.",
    "id": 96,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips Airfryer XXL Smart Sensing with Rapid Air Tech (HD9867)",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 24995,
    "discount": 28,
    "rating": 4.8,
    "reviewCount": 720,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black & Copper Gold",
          "hex": "#1C1C1C"
        }
      ],
      "sizes": [
        "XXL (1.4kg / 7.3L Capacity)"
      ]
    },
    "specs": {
      "Technology": "Smart Sensing automatically adjusts time and temperature",
      "Fat Removal": "Twin TurboStar extracts excess fat",
      "Capacity": "Serves up to 6 portions"
    },
    "description": "The only airfryer with Smart Sensing technology that automatically calculates cooking time for crispy, tender results with up to 90% less fat.",
    "id": 97,
    "badge": "28% OFF",
    "images": [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips Sonicare 9900 Prestige Smart Electric Toothbrush with SenseIQ",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 26999,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 310,
    "stock": 25,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Midnight Blue",
          "hex": "#1A2536"
        },
        {
          "name": "Champagne Gold",
          "hex": "#F7E7CE"
        }
      ],
      "sizes": [
        "With Leather USB Case"
      ]
    },
    "specs": {
      "AI": "SenseIQ technology senses pressure, motion, and coverage 100x/sec",
      "Sonic": "62,000 bristle movements per minute"
    },
    "description": "Our most advanced electric toothbrush senses your brushing style and adapts automatically in real time.",
    "id": 98,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips Norelco Series 9000 Wet and Dry Electric Shaver (S9987)",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 21995,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 280,
    "stock": 28,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Dark Chrome",
          "hex": "#3A3A3A"
        }
      ],
      "sizes": [
        "With Quick Clean Pod Dock"
      ]
    },
    "specs": {
      "Blades": "Dual SteelPrecision self-sharpening blades (150,000 cuts/min)",
      "Sensors": "Pressure Guard sensor with luminous light ring"
    },
    "description": "Ultimate skin comfort and closeness with AI-powered Pressure Guard guidance and 360-degree flexible heads.",
    "id": 99,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips PerfectCare 9000 Series Steam Generator Iron",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 39990,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 160,
    "stock": 15,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Dark Navy / Copper",
          "hex": "#1A2B4C"
        }
      ],
      "sizes": [
        "9.0 Bar Pressure"
      ]
    },
    "specs": {
      "Camera": "ActiveSense built-in camera detects fabric type automatically",
      "Steam": "Up to 750g steam boost with zero burns guaranteed"
    },
    "description": "World's first iron that knows what you are ironing using built-in camera recognition and AI fabric matching.",
    "id": 100,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips 5400 Series LatteGo Fully Automatic Espresso Machine",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 64990,
    "discount": 18,
    "rating": 4.8,
    "reviewCount": 240,
    "stock": 12,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Piano Black / Chrome",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "12 Coffee Varieties"
      ]
    },
    "specs": {
      "Beverages": "12 delicious coffee drinks at the touch of a button",
      "Milk System": "LatteGo 2-part tube-free milk system cleans in 15 seconds",
      "Grinder": "100% pure ceramic burr grinder"
    },
    "description": "Silky-smooth milk froth and bean-to-cup café quality espresso drinks prepared in seconds.",
    "id": 101,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips Series 3000i Smart Air Purifier for Extra Large Rooms",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 24995,
    "discount": 30,
    "rating": 4.7,
    "reviewCount": 410,
    "stock": 30,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Nordic Grey Fabric",
          "hex": "#F3F3F3"
        }
      ],
      "sizes": [
        "Up to 104m² Coverage"
      ]
    },
    "specs": {
      "CADR": "Clean Air Delivery Rate of 520 m³/h",
      "Filtration": "NanoProtect HEPA captures 99.97% of particles down to 0.003 microns",
      "App": "CleanHome+ smartphone monitoring"
    },
    "description": "Purifies rooms up to 104 m² in under 6 minutes with 3-layer NanoProtect HEPA filtration.",
    "id": 102,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips 8000 Series Handheld Garment Steamer with Heated Plate",
    "category": "Home Appliances",
    "brand": "Philips",
    "price": 7995,
    "discount": 22,
    "rating": 4.6,
    "reviewCount": 380,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Midnight Black / Gold",
          "hex": "#1F1F1F"
        }
      ],
      "sizes": [
        "32g/min Continuous Steam"
      ]
    },
    "specs": {
      "Steam": "32g/min powerful continuous steam",
      "Plate": "OptimalTEMP heated soleplate (no burns guaranteed)",
      "Ready": "Ready to use in 45 seconds"
    },
    "description": "Quick horizontal and vertical de-wrinkling for quick morning refreshes with heated SmartFlow soleplate.",
    "id": 103,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Bespoke 4-Door Flex Refrigerator with Beverage Center",
    "category": "Home Appliances",
    "brand": "Samsung",
    "price": 189990,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 180,
    "stock": 8,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Bespoke Luxury",
    "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Glam Navy & White Glass",
          "hex": "#1A2536"
        }
      ],
      "sizes": [
        "670L French Door"
      ]
    },
    "specs": {
      "Capacity": "670L French Door Net Capacity",
      "Beverage": "Beverage Center with AutoFill Pitcher",
      "FlexZone": "Customizable temperature compartment"
    },
    "description": "Customizable customizable glass door panels, dual auto ice makers, and integrated filtered beverage center.",
    "id": 104,
    "images": [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung WindFree AI Inverter Split Air Conditioner 1.5 Ton 5 Star",
    "category": "Home Appliances",
    "brand": "Samsung",
    "price": 46990,
    "discount": 28,
    "rating": 4.7,
    "reviewCount": 340,
    "stock": 22,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White with 23,000 Micro-holes",
          "hex": "#FAFAFA"
        }
      ],
      "sizes": [
        "1.5 Ton 5 Star"
      ]
    },
    "specs": {
      "Technology": "WindFree Cooling disperses air through 23,000 micro-holes",
      "AI": "AI Auto Cooling analyzes room conditions and usage patterns"
    },
    "description": "Stay comfortably cool without the unpleasant feeling of cold drafts on your skin using micro-hole air dispersion.",
    "id": 105,
    "badge": "28% OFF",
    "images": [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Ecobubble 9kg Front Load AI Washing Machine",
    "category": "Home Appliances",
    "brand": "Samsung",
    "price": 38990,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Inox Grey with Tinted Door",
          "hex": "#3A3D40"
        }
      ],
      "sizes": [
        "9kg AI Control"
      ]
    },
    "specs": {
      "Tech": "EcoBubble transforms detergent into bubbles for deep fabric cleaning at low temps",
      "Steam": "Hygiene Steam eliminates 99.9% of bacteria",
      "Motor": "Digital Inverter Motor with 20 Year Warranty"
    },
    "description": "AI Control personalizes wash cycles while EcoBubble tech delivers 40% fabric protection and power savings.",
    "id": 106,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Minimalist Accent Armchair with Solid Oak Legs",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 18499,
    "discount": 35,
    "rating": 4.7,
    "reviewCount": 98,
    "stock": 10,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "badge": "Top Rated",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Oatmeal Beige",
          "hex": "#D8C7B5"
        },
        {
          "name": "Charcoal Grey",
          "hex": "#3D424A"
        },
        {
          "name": "Forest Green",
          "hex": "#2C402E"
        }
      ],
      "sizes": [
        "Single Seater",
        "With Matching Ottoman"
      ]
    },
    "specs": {
      "Frame": "Solid FSC Oak Wood",
      "Fabric": "Textured Boucle Upholstery",
      "Capacity": "150 kg max load"
    },
    "description": "Handcrafted Scandinavian design combining solid natural oak with ultra-plush stain-resistant woven upholstery.",
    "id": 107,
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Solid White Oak Dining Table 6-Seater",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 34999,
    "discount": 25,
    "rating": 4.9,
    "reviewCount": 65,
    "stock": 8,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Natural White Oak",
          "hex": "#C8AD7F"
        },
        {
          "name": "Smoked Black Oak",
          "hex": "#2B2825"
        }
      ],
      "sizes": [
        "180cm x 90cm (6-Seater)",
        "220cm x 100cm (8-Seater)"
      ]
    },
    "specs": {
      "Material": "100% Solid European White Oak",
      "Finish": "Matte protective hardwax oil finish",
      "Joints": "Traditional mortise and tenon joinery"
    },
    "description": "A centerpiece dining table featuring bevel-edged solid European oak planks and tapered architectural legs.",
    "id": 108,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Stockholm 3-Seater Minimalist Fabric Sofa",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 44999,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 112,
    "stock": 6,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Pebble Grey",
          "hex": "#A8A9AD"
        },
        {
          "name": "Warm Taupe",
          "hex": "#B3A28F"
        },
        {
          "name": "Deep Navy",
          "hex": "#1C2B3F"
        }
      ],
      "sizes": [
        "3-Seater (220cm)"
      ]
    },
    "specs": {
      "Cushioning": "High-density pocket spring with feather-down topper",
      "Suspension": "No-sag sinuous spring base",
      "Fabric": "Heavyweight Martindale 50,000 rub count"
    },
    "description": "Generously proportioned Scandinavian sofa with clean linear profiles, loose back pillows, and oak block feet.",
    "id": 109,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Walnut Mid-Century Modern Coffee Table",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 14999,
    "discount": 30,
    "rating": 4.7,
    "reviewCount": 88,
    "stock": 14,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "American Walnut",
          "hex": "#5C3A21"
        },
        {
          "name": "Natural Oak",
          "hex": "#C4A482"
        }
      ],
      "sizes": [
        "110cm Oval",
        "90cm Round"
      ]
    },
    "specs": {
      "Wood": "Solid American Walnut Wood",
      "Storage": "Under-shelf magazine compartment",
      "Edges": "Chamfered organic curve"
    },
    "description": "Organic curved silhouette crafted in rich American walnut with a discreet bottom shelf for magazines and remotes.",
    "id": 110,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Copenhagen Ergonomic Swivel Lounge Chair",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 27999,
    "discount": 22,
    "rating": 4.9,
    "reviewCount": 75,
    "stock": 8,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cognac Top Grain Leather",
          "hex": "#9E4714"
        },
        {
          "name": "Oatmeal Wool",
          "hex": "#E3DAC9"
        }
      ],
      "sizes": [
        "Chair + Ottoman Set"
      ]
    },
    "specs": {
      "Base": "360-degree brushed stainless steel swivel star base",
      "Recline": "Smooth tilt-tension reclining mechanism"
    },
    "description": "The peak of executive relaxation combining contoured fiberglass molded shell with supple cognac leather.",
    "id": 111,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Scandinavian 5-Tier Minimalist Bookcase",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 16999,
    "discount": 25,
    "rating": 4.6,
    "reviewCount": 92,
    "stock": 15,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Oak / Matte White Shelves",
          "hex": "#E8E2D5"
        },
        {
          "name": "Solid Smoked Oak",
          "hex": "#3A3530"
        }
      ],
      "sizes": [
        "180cm x 90cm"
      ]
    },
    "specs": {
      "Structure": "Solid oak ladder frame",
      "Shelves": "5 reinforced deep open shelves",
      "Assembly": "Easy 15-minute tool-free assembly"
    },
    "description": "Open architectural shelving unit that creates an airy display space for books, ceramics, and indoor greenery.",
    "id": 112,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Boucle Storage Ottoman Bench",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 9999,
    "discount": 28,
    "rating": 4.7,
    "reviewCount": 130,
    "stock": 20,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cream White Boucle",
          "hex": "#F5F2EB"
        },
        {
          "name": "Sage Green Boucle",
          "hex": "#8A9A86"
        }
      ],
      "sizes": [
        "110cm Length"
      ]
    },
    "specs": {
      "Storage": "Hydraulic soft-close safety hinges",
      "Upholstery": "High-pile textured boucle fabric",
      "Legs": "Solid oak tapered feet"
    },
    "description": "Multifunctional hallway and end-of-bed bench providing hidden storage with cloud-like boucle texture.",
    "id": 113,
    "badge": "28% OFF",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Floating Oak Wall Shelf Unit with Brass Brackets",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 4999,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 165,
    "stock": 35,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Natural Oak / Brushed Brass",
          "hex": "#C5A059"
        }
      ],
      "sizes": [
        "80cm Pair",
        "120cm Pair"
      ]
    },
    "specs": {
      "Timber": "Solid European Oak timber",
      "Brackets": "Solid brushed brass support brackets",
      "Load": "Supports up to 25kg each"
    },
    "description": "Minimalist wall display shelves handcrafted from solid oak planks with warm solid brass support brackets.",
    "id": 114,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Oslo Solid Oak Minimalist Writing Desk with Drawers",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 22999,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 80,
    "stock": 12,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Natural Oak",
          "hex": "#D4B996"
        }
      ],
      "sizes": [
        "120cm x 60cm Desk"
      ]
    },
    "specs": {
      "Drawers": "2 soft-close felt-lined organizer drawers",
      "Cable": "Integrated rear cable routing channel",
      "Legs": "Solid tapered timber legs"
    },
    "description": "Clean home office writing desk featuring integrated felt-lined stationery drawers and cable management.",
    "id": 115,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nordic Living Platform Bed Frame with Upholstered Headboard",
    "category": "Furniture",
    "brand": "Nordic Living",
    "price": 38999,
    "discount": 22,
    "rating": 4.9,
    "reviewCount": 95,
    "stock": 7,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Oak & Oatmeal Linen",
          "hex": "#D8CFBC"
        },
        {
          "name": "Walnut & Slate Grey",
          "hex": "#4A4E53"
        }
      ],
      "sizes": [
        "Queen Size",
        "King Size"
      ]
    },
    "specs": {
      "Frame": "Solid kiln-dried hardwood frame",
      "Slats": "Solid birch flex slat support system (no box spring needed)"
    },
    "description": "Low-profile platform bed with a plush padded linen headboard and sturdy solid wood platform support.",
    "id": 116,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA POÄNG Classic Bentwood Armchair with Leather Cushion",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 12990,
    "discount": 15,
    "rating": 4.8,
    "reviewCount": 840,
    "stock": 45,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Birch Veneer / Glose Dark Brown Leather",
          "hex": "#3B2616"
        },
        {
          "name": "Black-Brown / Seglora Natural",
          "hex": "#C19A6B"
        }
      ],
      "sizes": [
        "Standard Armchair",
        "Armchair + Footstool"
      ]
    },
    "specs": {
      "Frame": "Layer-glued bent birch wood provides resilient springiness",
      "Cover": "Full-grain supple leather"
    },
    "description": "Timeless bentwood armchair with a flexible frame that responds to your body movements with soothing springiness.",
    "id": 117,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA MALM Queen Size High Bed Frame with 4 Storage Drawers",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 24990,
    "discount": 10,
    "rating": 4.7,
    "reviewCount": 620,
    "stock": 20,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White Stained Oak Veneer",
          "hex": "#D9CEB9"
        },
        {
          "name": "Black-Brown",
          "hex": "#221C16"
        },
        {
          "name": "White",
          "hex": "#FFFFFF"
        }
      ],
      "sizes": [
        "Queen (160x200cm)",
        "King (180x200cm)"
      ]
    },
    "specs": {
      "Storage": "4 large smooth-rolling under-bed storage boxes",
      "Headboard": "High headboard for comfortable reading in bed"
    },
    "description": "Clean design with real wood veneer. Generous storage space hidden under the bed keeps bedrooms clutter-free.",
    "id": 118,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA STRANDMON Wingback High-Back Accent Chair",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 19990,
    "discount": 18,
    "rating": 4.8,
    "reviewCount": 450,
    "stock": 18,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Nordvalla Dark Grey",
          "hex": "#484B4E"
        },
        {
          "name": "Skiftebo Yellow",
          "hex": "#E1AD01"
        },
        {
          "name": "Kelinge Green",
          "hex": "#2E5339"
        }
      ],
      "sizes": [
        "Wing Chair",
        "Chair + Ottoman"
      ]
    },
    "specs": {
      "Support": "High back gives great support for your neck",
      "Cover": "Durable textured woven polyester cover"
    },
    "description": "An iconic 1950s wing chair revitalized with modern seating ergonomics and enveloping cozy wing panels.",
    "id": 119,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA BEKANT Motorized Sit-Stand Adjustable Ergonomic Desk",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 36990,
    "discount": 12,
    "rating": 4.7,
    "reviewCount": 310,
    "stock": 15,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White Stained Oak / Black Legs",
          "hex": "#D4C5A9"
        },
        {
          "name": "Black / Black Frame",
          "hex": "#1C1C1C"
        }
      ],
      "sizes": [
        "160cm x 80cm"
      ]
    },
    "specs": {
      "Adjustment": "Electric height adjustment from 65cm to 125cm",
      "Motor": "Quiet dual-motor lift mechanism",
      "Cable": "Cable management net underneath"
    },
    "description": "Switch seamlessly between sitting and standing during your workday with smooth motorized height adjustment.",
    "id": 120,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA KALLAX 4x4 Cube Shelving Unit with Insert Options",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 11990,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 920,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Black-Brown",
          "hex": "#1F1A16"
        },
        {
          "name": "High Gloss White",
          "hex": "#FAFAFA"
        }
      ],
      "sizes": [
        "147cm x 147cm (16 Cubes)"
      ]
    },
    "specs": {
      "Capacity": "16 modular 33x33cm storage cubes",
      "Versatility": "Can be used as room divider standing upright or horizontal"
    },
    "description": "The world's most versatile cube shelving unit for vinyl records, storage boxes, books, and decor.",
    "id": 121,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA BILLY Bookcase with Glass Panel Doors",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 14990,
    "discount": 10,
    "rating": 4.8,
    "reviewCount": 780,
    "stock": 25,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White / Clear Glass",
          "hex": "#FFFFFF"
        },
        {
          "name": "Black Oak Effect",
          "hex": "#222222"
        }
      ],
      "sizes": [
        "80x30x202 cm"
      ]
    },
    "specs": {
      "Doors": "Tempered glass panel doors keep dust out",
      "Shelves": "Adjustable shelves allow customization"
    },
    "description": "Estimated that every 5 seconds, one BILLY bookcase is sold somewhere in the world. Timeless library storage.",
    "id": 122,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA MARKUS High-Back Ergonomic Office Mesh Chair",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 14990,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 690,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Office Hero",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Vissle Dark Grey",
          "hex": "#3A3D40"
        },
        {
          "name": "Glose Black Leather",
          "hex": "#151515"
        }
      ],
      "sizes": [
        "Standard Ergonomic"
      ]
    },
    "specs": {
      "Back": "Breathable mesh back with built-in lumbar support",
      "Mechanism": "Synchronized tilt lock mechanism with safety castors"
    },
    "description": "Comfortable high-back office chair with built-in lumbar support and breathable mesh for long work sessions.",
    "id": 123,
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA HEMNES 8-Drawer Solid Pine Bedroom Dresser",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 24990,
    "discount": 15,
    "rating": 4.7,
    "reviewCount": 380,
    "stock": 14,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White Stain",
          "hex": "#F3F1EC"
        },
        {
          "name": "Black-Brown",
          "hex": "#1C1713"
        }
      ],
      "sizes": [
        "160cm x 96cm"
      ]
    },
    "specs": {
      "Wood": "Sustainably sourced solid pine wood",
      "Drawers": "8 smooth-running drawers with pull-out stops"
    },
    "description": "Traditional craftsmanship in solid pine with smooth gliding drawers and deep storage for clothing and linens.",
    "id": 124,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA LACK Minimalist Square Coffee Table",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 2990,
    "discount": 25,
    "rating": 4.5,
    "reviewCount": 1100,
    "stock": 80,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Black",
          "hex": "#111111"
        },
        {
          "name": "White Stained Oak Effect",
          "hex": "#D6C7B2"
        }
      ],
      "sizes": [
        "90cm x 55cm"
      ]
    },
    "specs": {
      "Design": "Honeycomb paper filling structure is light yet strong",
      "Shelf": "Separate shelf for magazines and remotes"
    },
    "description": "Clean geometric coffee table that pairs easily with other furnishings and fits into any modern apartment.",
    "id": 125,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "IKEA ALEX Modular 5-Drawer Storage Unit with Casters",
    "category": "Furniture",
    "brand": "IKEA",
    "price": 8990,
    "discount": 15,
    "rating": 4.9,
    "reviewCount": 860,
    "stock": 45,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "White",
          "hex": "#FFFFFF"
        },
        {
          "name": "Black-Brown",
          "hex": "#1E1814"
        },
        {
          "name": "Grey-Turquoise",
          "hex": "#5E7D7E"
        }
      ],
      "sizes": [
        "36x70 cm"
      ]
    },
    "specs": {
      "Drawers": "5 drop-front drawers with drawer stops",
      "Mobility": "Castors included for easy rolling under desks"
    },
    "description": "The beloved desk companion worldwide featuring five deep drawers for tools, makeup, art supplies, and paperwork.",
    "id": 126,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Aviator Classic Polarized Sunglasses (RB3025)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 11590,
    "discount": 30,
    "rating": 4.8,
    "reviewCount": 520,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "50% OFF Deal",
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Gold / G-15 Green Polarized",
          "hex": "#D4AF37"
        },
        {
          "name": "Gunmetal / Polarized Grey",
          "hex": "#4A4A4A"
        },
        {
          "name": "Black / Crystal Green",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "Standard (58mm)",
        "Large (62mm)"
      ]
    },
    "specs": {
      "Frame": "Corrosion-resistant metal alloy",
      "Lens": "Polarized UV400 Crystal Glass",
      "Bridge": "14mm with adjustable silicone nose pads"
    },
    "description": "Originally designed for U.S. aviators in 1937, Ray-Ban Aviators combine iconic styling with exceptional optical clarity.",
    "id": 127,
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Original Wayfarer Classic Sunglasses (RB2140)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 10290,
    "discount": 25,
    "rating": 4.9,
    "reviewCount": 780,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Iconic Legend",
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Polished Black / Green G-15",
          "hex": "#0F0F0F"
        },
        {
          "name": "Tortoise / Crystal Brown",
          "hex": "#5C3A21"
        }
      ],
      "sizes": [
        "Standard (50mm)",
        "Large (54mm)"
      ]
    },
    "specs": {
      "Frame": "High-density acetate frame",
      "Hinges": "7-barrel steel hinges",
      "UV Protection": "100% UVA/UVB protection"
    },
    "description": "The most recognizable style in the history of sunglasses, worn by artists, musicians, and trendsetters worldwide.",
    "id": 128,
    "images": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Clubmaster Classic Browline Sunglasses (RB3016)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 10890,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 390,
    "stock": 28,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Mock Tortoise & Gold / Green G-15",
          "hex": "#7B3F00"
        },
        {
          "name": "Black & Gold",
          "hex": "#1A1A1A"
        }
      ],
      "sizes": [
        "Standard (49mm)",
        "Large (51mm)"
      ]
    },
    "specs": {
      "Style": "Retro 1950s browline silhouette",
      "Accents": "Polished gold metal rim with acetate brow bar"
    },
    "description": "Vintage and timeless, Clubmaster sunglasses are inspired by the 50s intellectual and counter-culture icons.",
    "id": 129,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Round Metal Unisex Iconic Sunglasses (RB3447)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 11190,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 340,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Gold / Crystal Green",
          "hex": "#D4AF37"
        },
        {
          "name": "Copper / Pink Gradient Flash",
          "hex": "#B87333"
        },
        {
          "name": "Black / Dark Grey",
          "hex": "#111111"
        }
      ],
      "sizes": [
        "Small (47mm)",
        "Standard (50mm)",
        "Large (53mm)"
      ]
    },
    "specs": {
      "Frame": "Tubular metal frame with curved brow bar",
      "Lenses": "Round crystal mineral glass lenses"
    },
    "description": "A retro counterculture favorite originating in the 1960s with distinctive curved brow bar and thin metal temples.",
    "id": 130,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Justin Classic Matte Rectangular Sunglasses (RB4165)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 8990,
    "discount": 30,
    "rating": 4.7,
    "reviewCount": 460,
    "stock": 35,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Rubber Black / Grey Gradient",
          "hex": "#1A1A1A"
        },
        {
          "name": "Rubber Havana / Brown Gradient",
          "hex": "#4A3525"
        }
      ],
      "sizes": [
        "Standard (54mm)",
        "Large (55mm)"
      ]
    },
    "specs": {
      "Finish": "Soft rubberized matte touch finish",
      "Lenses": "Gradient polycarbonate impact resistant lenses"
    },
    "description": "One of the coolest looks in the Ray-Ban collection inspired by the Wayfarer with a bold rubberized matte frame.",
    "id": 131,
    "badge": "30% OFF",
    "images": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Erika Round Acetate Sunglasses with Metal Temples (RB4171)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 9490,
    "discount": 25,
    "rating": 4.8,
    "reviewCount": 380,
    "stock": 30,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Rubber Black / Gunmetal Temples",
          "hex": "#111111"
        },
        {
          "name": "Rubber Tortoise / Silver Temples",
          "hex": "#634735"
        }
      ],
      "sizes": [
        "Standard (54mm)"
      ]
    },
    "specs": {
      "Design": "Oversized round silhouette",
      "Temples": "Ultra-thin metallic temples with tone-matching tips"
    },
    "description": "The perfect accessory to set your look apart featuring both classic and bright rubber fronts and sleek metal arms.",
    "id": 132,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Hexagonal Flat Lenses Geometric Sunglasses (RB3548N)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 11990,
    "discount": 20,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 22,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Gold / Flat G-15 Green",
          "hex": "#D4AF37"
        },
        {
          "name": "Copper / Flash Copper Lenses",
          "hex": "#B87333"
        }
      ],
      "sizes": [
        "Standard (51mm)",
        "Large (54mm)"
      ]
    },
    "specs": {
      "Shape": "Novel hexagonal coin profile",
      "Lenses": "Flat crystal lenses on slim metallic profile"
    },
    "description": "What do you get when you cross a circle with a square? You get the hexagonal evolution of classic round sunglasses.",
    "id": 133,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban State Street Square Acetate Sunglasses (RB2186)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 12490,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 180,
    "stock": 18,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / Polarized Dark Blue",
          "hex": "#101010"
        },
        {
          "name": "Havana Red / Brown",
          "hex": "#5B2C1F"
        }
      ],
      "sizes": [
        "Standard (49mm)"
      ]
    },
    "specs": {
      "Edge": "Faceted bold geometric acetate angles",
      "Profile": "Thick premium Italian acetate craftsmanship"
    },
    "description": "Bold rectangular acetate profile inspired by the vibrant street style of 1970s Chicago.",
    "id": 134,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Clubround Modern Browline Sunglasses (RB4246)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 10990,
    "discount": 20,
    "rating": 4.6,
    "reviewCount": 195,
    "stock": 20,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black & Gold / Green Classic",
          "hex": "#1C1C1C"
        },
        {
          "name": "Tortoise / Brown Classic",
          "hex": "#4B2E18"
        }
      ],
      "sizes": [
        "Standard (51mm)"
      ]
    },
    "specs": {
      "Fusion": "Combines Clubmaster browline with round lens silhouette",
      "Quality": "Handcrafted premium Italian acetate and metal"
    },
    "description": "The stylish fusion of two of Ray-Ban's most successful icons: the Clubmaster and the Round.",
    "id": 135,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Ray-Ban Caravan Geometric Square Sunglasses (RB3136)",
    "category": "Accessories",
    "brand": "Ray-Ban",
    "price": 11490,
    "discount": 22,
    "rating": 4.7,
    "reviewCount": 160,
    "stock": 22,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Arista Gold / G-15 Green",
          "hex": "#D4AF37"
        },
        {
          "name": "Gunmetal / Grey Polarized",
          "hex": "#404040"
        }
      ],
      "sizes": [
        "Standard (58mm)"
      ]
    },
    "specs": {
      "Design": "Square geometric wireframe alternative to classic teardrop aviators",
      "Lenses": "Mineral glass crystal"
    },
    "description": "Introduced in 1957 as a square alternative to the classic Aviator with clean streamlined metal geometry.",
    "id": 136,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
    "category": "Accessories",
    "brand": "Apple",
    "price": 89900,
    "discount": 8,
    "rating": 4.9,
    "reviewCount": 390,
    "stock": 25,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "badge": "Premium Titanium",
    "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Natural Titanium",
          "hex": "#C5B358"
        },
        {
          "name": "Black Titanium",
          "hex": "#222222"
        }
      ],
      "sizes": [
        "Orange Ocean Band",
        "Blue Trail Loop (M/L)",
        "Alpine Loop"
      ]
    },
    "specs": {
      "Case": "49mm Aerospace Titanium with sapphire crystal",
      "Screen": "3000 nits Always-On Retina",
      "Depth": "100m water resistant with dive computer"
    },
    "description": "The most rugged and capable Apple Watch ever designed for endurance athletes and outdoor adventurers.",
    "id": 137,
    "images": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple Watch Series 9 GPS 45mm Midnight Aluminum",
    "category": "Accessories",
    "brand": "Apple",
    "price": 44900,
    "discount": 12,
    "rating": 4.8,
    "reviewCount": 580,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Midnight",
          "hex": "#1A232E"
        },
        {
          "name": "Starlight",
          "hex": "#EAE6DF"
        },
        {
          "name": "Silver",
          "hex": "#E3E4E6"
        },
        {
          "name": "(PRODUCT)RED",
          "hex": "#D91B24"
        }
      ],
      "sizes": [
        "41mm",
        "45mm"
      ]
    },
    "specs": {
      "Chip": "S9 SiP with Double Tap gesture control",
      "Display": "2000 nits edge-to-edge Retina",
      "Health": "ECG app, Blood Oxygen, and Temperature sensing"
    },
    "description": "Smarter, brighter, and mightier with the Double Tap magical gesture and precision heart monitoring.",
    "id": 138,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Apple FineWoven MagSafe Wallet with Find My Support",
    "category": "Accessories",
    "brand": "Apple",
    "price": 5900,
    "discount": 10,
    "rating": 4.6,
    "reviewCount": 220,
    "stock": 45,
    "isBestSeller": false,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Taupe",
          "hex": "#B3A28F"
        },
        {
          "name": "Black",
          "hex": "#181818"
        },
        {
          "name": "Pacific Blue",
          "hex": "#2C4A6F"
        }
      ],
      "sizes": [
        "Holds up to 3 cards"
      ]
    },
    "specs": {
      "Material": "Durable microtwill FineWoven material with soft suede-like handfeel",
      "Tracking": "Supports Find My location tracking when detached"
    },
    "description": "Designed with both style and function in mind, the iPhone FineWoven Wallet with MagSafe keeps your ID and credit cards right at hand.",
    "id": 139,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Samsung Galaxy Watch 6 Classic 47mm Bluetooth (Rotating Bezel)",
    "category": "Accessories",
    "brand": "Samsung",
    "price": 36999,
    "discount": 22,
    "rating": 4.8,
    "reviewCount": 310,
    "stock": 22,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black Stainless Steel",
          "hex": "#1C1C1C"
        },
        {
          "name": "Silver Stainless Steel",
          "hex": "#E0E0E0"
        }
      ],
      "sizes": [
        "43mm",
        "47mm"
      ]
    },
    "specs": {
      "Bezel": "Physical rotating navigation bezel",
      "Display": "Sapphire Crystal Super AMOLED display",
      "Health": "Body Composition (BIA), ECG, and Sleep Coaching"
    },
    "description": "A timeless classic with 15% thinner rotating bezel and sapphire crystal glass durability.",
    "id": 140,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Nike Brasilia 9.5 Training Duffel Bag Medium (60L)",
    "category": "Accessories",
    "brand": "Nike",
    "price": 2695,
    "discount": 20,
    "rating": 4.7,
    "reviewCount": 420,
    "stock": 50,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Midnight Black / White",
          "hex": "#121212"
        },
        {
          "name": "Midnight Navy",
          "hex": "#192841"
        }
      ],
      "sizes": [
        "Medium 60 Litres"
      ]
    },
    "specs": {
      "Fabric": "100% heavy-duty recycled polyester",
      "Compartments": "Separate ventilated shoe compartment + padded shoulder strap"
    },
    "description": "The spacious and durable duffel keeps all your workout and travel gear organized in dedicated zippered compartments.",
    "id": 141,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Adidas Originals Classic Trefoil Urban Backpack",
    "category": "Accessories",
    "brand": "Adidas",
    "price": 2499,
    "discount": 25,
    "rating": 4.7,
    "reviewCount": 380,
    "stock": 45,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / Contrast White Trefoil",
          "hex": "#111111"
        },
        {
          "name": "Night Indigo Blue",
          "hex": "#1D283A"
        }
      ],
      "sizes": [
        "24 Litres (Holds 15.6\" Laptop)"
      ]
    },
    "specs": {
      "Pockets": "Padded laptop sleeve inside main compartment + front zip pouch",
      "Straps": "Padded ergonomic shoulder straps"
    },
    "description": "Everyday commuting backpack featuring heritage Trefoil screen print and dedicated protective laptop pocket.",
    "id": 142,
    "badge": "25% OFF",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips Hue Smart LED White & Color Ambiance Starter Kit",
    "category": "Accessories",
    "brand": "Philips",
    "price": 13990,
    "discount": 18,
    "rating": 4.8,
    "reviewCount": 260,
    "stock": 20,
    "isBestSeller": true,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "16 Million Colors + Tunable White",
          "hex": "#FF007F"
        }
      ],
      "sizes": [
        "3 Smart Bulbs + Hue Bridge Hub"
      ]
    },
    "specs": {
      "Colors": "16 Million colors and 50,000 shades of warm-to-cool white",
      "Sync": "Music, gaming, and movie screen sync"
    },
    "description": "Transform your room atmosphere with intelligent smart lighting that syncs to Spotify, movies, and smart assistants.",
    "id": 143,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Philips SmartSleep Connected Sleep and Wake-Up Light",
    "category": "Accessories",
    "brand": "Philips",
    "price": 18990,
    "discount": 15,
    "rating": 4.7,
    "reviewCount": 140,
    "stock": 14,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Glossy White & Sunset Amber",
          "hex": "#FFA07A"
        }
      ],
      "sizes": [
        "With SleepMapper App"
      ]
    },
    "specs": {
      "Simulation": "Natural sunrise and sunset gradual light transition",
      "Sounds": "8 natural wake-up sounds + FM radio"
    },
    "description": "Clinically proven wake-up light that gradually brightens like a real sunrise to help you wake feeling refreshed and energized.",
    "id": 144,
    "badge": "",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Embossed Genuine Leather Crossbody Messenger Bag",
    "category": "Accessories",
    "brand": "Zara",
    "price": 4990,
    "discount": 20,
    "rating": 4.6,
    "reviewCount": 175,
    "stock": 25,
    "isBestSeller": false,
    "isDeal": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Cognac Brown",
          "hex": "#7B3F00"
        },
        {
          "name": "Onyx Black",
          "hex": "#141414"
        }
      ],
      "sizes": [
        "One Size"
      ]
    },
    "specs": {
      "Material": "100% Genuine Cowhide Leather with textured grain",
      "Strap": "Adjustable webbing crossbody strap with metal carabiners"
    },
    "description": "Compact structured leather city bag designed for smartphones, passport, cards, and daily essentials.",
    "id": 145,
    "badge": "Trending",
    "images": [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  },
  {
    "name": "Zara Reversible Textured Leather Belt with Brushed Metal Buckle",
    "category": "Accessories",
    "brand": "Zara",
    "price": 2290,
    "discount": 15,
    "rating": 4.7,
    "reviewCount": 290,
    "stock": 40,
    "isBestSeller": true,
    "isDeal": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=75&fm=webp",
    "variants": {
      "colors": [
        {
          "name": "Black / Dark Brown Reversible",
          "hex": "#222222"
        }
      ],
      "sizes": [
        "32",
        "34",
        "36",
        "38"
      ]
    },
    "specs": {
      "Mechanism": "360-degree twist buckle for instant color reversal",
      "Leather": "100% Top Grain Smooth & Saffiano Leather"
    },
    "description": "Two belts in one. Twist the brushed gunmetal buckle to switch between polished black and rich formal brown.",
    "id": 146,
    "badge": "Best Seller",
    "images": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=75&fm=webp"
    ]
  }
];

/* ==========================================================================
   NovaCart Core Utility Functions & Data Resilience Layer
   ========================================================================== */

function calculateDiscount(price, discountPercentage) {
    if (!discountPercentage || discountPercentage <= 0) return price;
    return Math.round(price - (price * discountPercentage / 100));
}

function formatPrice(price) {
    if (typeof price !== 'number') {
        price = Number(price) || 0;
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

function renderStars(rating = 0, showCount = false, reviewCount = 0) {
    const numRating = Math.max(0, Math.min(5, Number(rating) || 0));
    const fullStars = Math.floor(numRating);
    const hasHalfStar = (numRating % 1) >= 0.3 && (numRating % 1) <= 0.8;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0) - ((numRating % 1) > 0.8 ? 1 : 0));
    const effectiveFullStars = (numRating % 1) > 0.8 ? fullStars + 1 : fullStars;

    let starsHtml = '<span class="star-rating" style="color:#F59E0B; display:inline-flex; align-items:center; gap:2px; font-size:0.85rem;">';
    
    for (let i = 0; i < effectiveFullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star" style="opacity:0.4;"></i>';
    }
    
    starsHtml += `<span style="font-weight:700; margin-left:4px; color:var(--color-text-primary, #F8FAFC); font-size:0.82rem;">${numRating.toFixed(1)}</span>`;
    
    if (showCount && reviewCount !== undefined && reviewCount !== null) {
        const formattedCount = typeof reviewCount === 'number' ? reviewCount.toLocaleString('en-IN') : reviewCount;
        starsHtml += `<span style="color:var(--color-text-muted, #94A3B8); font-size:0.78rem; margin-left:4px;">(${formattedCount})</span>`;
    }
    
    starsHtml += '</span>';
    return starsHtml;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

async function fetchProducts() {
    if (typeof db !== 'undefined' && db && typeof firebase !== 'undefined' && firebase.firestore) {
        try {
            const snapshot = await db.collection('products').get();
            if (!snapshot.empty) {
                const firestoreProducts = [];
                snapshot.forEach(doc => {
                    firestoreProducts.push(doc.data());
                });
                if (firestoreProducts.length > 0) {
                    products = firestoreProducts;
                    if (typeof window !== 'undefined') window.products = products;
                    return products;
                }
            }
        } catch (e) {
            console.warn("Could not fetch products from Firestore, falling back to static products:", e);
        }
    }
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        if (typeof window !== 'undefined') window.products = products;
        return products;
    }
    return [];
}

function isInWishlist(productId) {
    if (typeof cachedWishlist !== 'undefined' && Array.isArray(cachedWishlist)) {
        return cachedWishlist.some(item => (typeof item === 'object' ? item.id == productId : item == productId));
    }
    try {
        const list = JSON.parse(localStorage.getItem('novacart_wishlist')) || [];
        return list.some(item => (typeof item === 'object' ? item.id == productId : item == productId));
    } catch (e) {
        return false;
    }
}

function shareProduct(productId) {
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            if (typeof showToast === 'function') {
                showToast('Product link copied to clipboard!', 'success');
            } else {
                alert('Product link copied to clipboard!');
            }
        }).catch(() => {
            prompt('Copy this product link:', url);
        });
    } else {
        prompt('Copy this product link:', url);
    }
}

// Expose globally
if (typeof window !== 'undefined') {
    window.products = products;
    window.getOptimizedImageUrl = getOptimizedImageUrl;
    window.calculateDiscount = calculateDiscount;
    window.formatPrice = formatPrice;
    window.renderStars = renderStars;
    window.escapeHtml = escapeHtml;
    window.fetchProducts = fetchProducts;
    window.isInWishlist = isInWishlist;
    window.shareProduct = shareProduct;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        getOptimizedImageUrl,
        calculateDiscount,
        formatPrice,
        renderStars,
        escapeHtml,
        fetchProducts,
        isInWishlist,
        shareProduct
    };
}
