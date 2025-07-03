import type { Product } from "@/lib/types"

export const products: Product[] = [
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
    id: "2",
    name: "MacBook Air M2",
    description: "Laptop siêu mỏng với chip M2 mạnh mẽ",
    price: 32990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 30,
    category: "Laptop",
  },
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
    id: "4",
    name: "iPad Air",
    description: "Máy tính bảng đa năng cho công việc và giải trí",
    price: 16990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 25,
    category: "Tablet",
  },
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
    id: "6",
    name: "Samsung Galaxy S24",
    description: "Smartphone Android flagship với AI tích hợp",
    price: 24990000,
    image: "/placeholder.svg?height=400&width=400",
    stock: 40,
    category: "Điện thoại",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}
