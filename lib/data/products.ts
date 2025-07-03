import type { Product } from "@/lib/types"

export const products: Product[] = [
  // Điện thoại
  {
    id: "1",
    name: "iPhone 15 Pro",
    description: "Điện thoại thông minh cao cấp với chip A17 Pro",
    price: 29990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 50,
    category: "Điện thoại",
  },
  {
    id: "6",
    name: "Samsung Galaxy S24",
    description: "Smartphone Android flagship với AI tích hợp",
    price: 24990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 40,
    category: "Điện thoại",
  },
  {
    id: "7",
    name: "iPhone 14",
    description: "Điện thoại iPhone thế hệ trước với giá tốt",
    price: 22990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 35,
    category: "Điện thoại",
  },
  {
    id: "8",
    name: "Xiaomi 14",
    description: "Flagship Xiaomi với camera Leica",
    price: 18990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 60,
    category: "Điện thoại",
  },

  // Laptop
  {
    id: "2",
    name: "MacBook Air M2",
    description: "Laptop siêu mỏng với chip M2 mạnh mẽ",
    price: 32990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 30,
    category: "Laptop",
  },
  {
    id: "9",
    name: "MacBook Pro M3",
    description: "Laptop chuyên nghiệp với chip M3 Pro",
    price: 52990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 20,
    category: "Laptop",
  },
  {
    id: "10",
    name: "Dell XPS 13",
    description: "Laptop Windows cao cấp với thiết kế đẹp",
    price: 28990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 25,
    category: "Laptop",
  },
  {
    id: "11",
    name: "ASUS ROG Strix",
    description: "Laptop gaming mạnh mẽ cho game thủ",
    price: 35990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 15,
    category: "Laptop",
  },

  // Phụ kiện
  {
    id: "3",
    name: "AirPods Pro",
    description: "Tai nghe không dây với chống ồn chủ động",
    price: 6990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 100,
    category: "Phụ kiện",
  },
  {
    id: "12",
    name: "Magic Mouse",
    description: "Chuột không dây của Apple",
    price: 2290000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 80,
    category: "Phụ kiện",
  },
  {
    id: "13",
    name: "Magic Keyboard",
    description: "Bàn phím không dây cao cấp",
    price: 4590000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 45,
    category: "Phụ kiện",
  },
  {
    id: "14",
    name: "Samsung Galaxy Buds",
    description: "Tai nghe true wireless của Samsung",
    price: 3990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 70,
    category: "Phụ kiện",
  },

  // Tablet
  {
    id: "4",
    name: "iPad Air",
    description: "Máy tính bảng đa năng cho công việc và giải trí",
    price: 16990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 25,
    category: "Tablet",
  },
  {
    id: "15",
    name: "iPad Pro 12.9",
    description: "Tablet chuyên nghiệp với chip M2",
    price: 32990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 18,
    category: "Tablet",
  },
  {
    id: "16",
    name: "Samsung Galaxy Tab S9",
    description: "Tablet Android cao cấp với S Pen",
    price: 22990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 22,
    category: "Tablet",
  },

  // Đồng hồ
  {
    id: "5",
    name: "Apple Watch Series 9",
    description: "Đồng hồ thông minh với tính năng sức khỏe tiên tiến",
    price: 9990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 75,
    category: "Đồng hồ",
  },
  {
    id: "17",
    name: "Apple Watch Ultra 2",
    description: "Đồng hồ thể thao chuyên nghiệp",
    price: 19990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 30,
    category: "Đồng hồ",
  },
  {
    id: "18",
    name: "Samsung Galaxy Watch 6",
    description: "Smartwatch Android với nhiều tính năng",
    price: 7990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 55,
    category: "Đồng hồ",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getAllCategories(): string[] {
  const categories = [...new Set(products.map((product) => product.category))]
  return categories.sort()
}
