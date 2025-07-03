import type { Product } from "@/lib/types"
import ProductCard from "@/components/product-card"

// Import trực tiếp data thay vì fetch API
const products: Product[] = [
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

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với TechStore</h1>
        <p className="text-xl text-gray-600 mb-8">Khám phá những sản phẩm công nghệ tốt nhất với giá cả hợp lý</p>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
