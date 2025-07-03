"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useApp } from "@/lib/context/app-context"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useApp()

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: "Hết hàng",
        description: "Sản phẩm này hiện đã hết hàng",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    })

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng`,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 flex-1">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square mb-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-md hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <Badge variant="secondary">{product.category}</Badge>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">{product.name}</h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
          {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </Button>
      </CardFooter>
    </Card>
  )
}
