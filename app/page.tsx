"use client"

import { useState, useMemo } from "react"
import ProductCard from "@/components/product-card"
import CategorySidebar from "@/components/category-sidebar"
import { products } from "@/lib/data/products"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Tính số lượng sản phẩm theo danh mục
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1
    })
    return counts
  }, [])

  // Lọc sản phẩm theo danh mục được chọn
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products
    }
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory])

  const getPageTitle = () => {
    if (!selectedCategory) {
      return "Tất cả sản phẩm"
    }
    return selectedCategory
  }

  const getPageDescription = () => {
    if (!selectedCategory) {
      return "Khám phá tất cả sản phẩm công nghệ tốt nhất"
    }
    return `Khám phá các sản phẩm ${selectedCategory.toLowerCase()} chất lượng cao`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - chỉ hiển thị khi chưa chọn danh mục */}
      {!selectedCategory && (
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl font-bold mb-4">Chào mừng đến với TechStore</h1>
          <p className="text-xl text-gray-600 mb-8">Khám phá những sản phẩm công nghệ tốt nhất với giá cả hợp lý</p>
        </section>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          productCounts={productCounts}
        />

        {/* Products Section */}
        <div className="flex-1">
          {/* Category Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{getPageTitle()}</h2>
            <p className="text-gray-600">{getPageDescription()}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">Hiển thị {filteredProducts.length} sản phẩm</span>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Xem tất cả sản phẩm
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm</h3>
              <p className="text-gray-500">Danh mục này hiện chưa có sản phẩm nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
