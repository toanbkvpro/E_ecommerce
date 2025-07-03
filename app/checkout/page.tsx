"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "@/lib/context/app-context"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.user) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để đặt hàng",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (state.cart.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const orderData = {
        userId: state.user.id,
        items: state.cart,
        total: getTotalPrice(),
        shippingAddress: formData,
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        dispatch({ type: "ADD_ORDER", payload: order })
        dispatch({ type: "CLEAR_CART" })

        toast({
          title: "Đặt hàng thành công!",
          description: `Đơn hàng #${order.id} đã được tạo thành công`,
        })

        router.push("/orders")
      } else {
        throw new Error("Không thể tạo đơn hàng")
      }
    } catch (error) {
      toast({
        title: "Lỗi đặt hàng",
        description: "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!state.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h1>
            <p className="text-gray-600 mb-6">Bạn cần đăng nhập để tiến hành thanh toán.</p>
            <Button onClick={() => router.push("/auth/login")}>Đăng nhập</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
            <Button onClick={() => router.push("/")}>Tiếp tục mua sắm</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin giao hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="city">Thành phố</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đặt hàng"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng của bạn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.cart.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>

            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{formatPrice(getTotalPrice())}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
