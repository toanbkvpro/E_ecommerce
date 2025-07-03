"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus } from "lucide-react"
import type { Product } from "@/lib/types"
import { getProductById } from "@/lib/data/products"
import { useApp } from "@/lib/context/app-context"
import { toast } from "@/hooks/use-toast"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { dispatch } = useApp()

  useEffect(() => {
    // Sử dụng function trực tiếp thay vì fetch API
    const foundProduct = getProductById(params.id)
    setProduct(foundProduct || null)
    setLoading(false)
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    if (product.stock === 0) {
      toast({
        title: "Hết hàng",
        description: "Sản phẩm này hiện đã hết hàng",
        variant: "destructive",
      })
      return
    }

    if (quantity > product.stock) {
      toast({
        title: "Không đủ hàng",
        description: `Chỉ còn ${product.stock} sản phẩm trong kho`,
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    })

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name} đã được thêm vào giỏ hàng`,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</div>

            <div className={`text-lg ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Số lượng:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button className="w-full py-3 text-lg" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng - {formatPrice(product.price * quantity)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
