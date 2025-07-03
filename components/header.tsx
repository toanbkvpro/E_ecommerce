"use client"

import Link from "next/link"
import { ShoppingCart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/context/app-context"

export default function Header() {
  const { state, dispatch } = useApp()

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    dispatch({ type: "CLEAR_CART" })
  }

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TechStore
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          {state.user && (
            <Link href="/orders" className="hover:text-blue-600">
              Đơn hàng
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>

          {state.user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm hidden md:block">Xin chào, {state.user.name}</span>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="outline">Đăng nhập</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
