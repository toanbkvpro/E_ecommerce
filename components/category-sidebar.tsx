"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Laptop, Headphones, Tablet, Watch, Menu } from "lucide-react"
import { useState } from "react"

interface CategorySidebarProps {
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
  productCounts: Record<string, number>
}

const categories = [
  { id: "all", name: "Tất cả sản phẩm", icon: Menu },
  { id: "Điện thoại", name: "Điện thoại", icon: Smartphone },
  { id: "Laptop", name: "Laptop", icon: Laptop },
  { id: "Phụ kiện", name: "Phụ kiện", icon: Headphones },
  { id: "Tablet", name: "Tablet", icon: Tablet },
  { id: "Đồng hồ", name: "Đồng hồ thông minh", icon: Watch },
]

export default function CategorySidebar({ selectedCategory, onCategorySelect, productCounts }: CategorySidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleCategoryClick = (categoryId: string) => {
    const category = categoryId === "all" ? null : categoryId
    onCategorySelect(category)
    setIsMobileMenuOpen(false) // Đóng menu mobile sau khi chọn
  }

  const sidebarContent = (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Danh mục sản phẩm</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === (category.id === "all" ? null : category.id)
            const count =
              category.id === "all"
                ? Object.values(productCounts).reduce((sum, count) => sum + count, 0)
                : productCounts[category.id] || 0

            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-4 ${
                  isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="text-left">{category.name}</span>
                  </div>
                  <Badge variant={isSelected ? "secondary" : "outline"} className="ml-2">
                    {count}
                  </Badge>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 sticky top-4">{sidebarContent}</div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full justify-start"
        >
          <Menu className="h-4 w-4 mr-2" />
          Danh mục sản phẩm
          {selectedCategory && (
            <Badge variant="secondary" className="ml-2">
              {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
            </Badge>
          )}
        </Button>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && <div className="mt-2">{sidebarContent}</div>}
      </div>
    </>
  )
}
