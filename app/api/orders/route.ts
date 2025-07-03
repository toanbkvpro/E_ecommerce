import { type NextRequest, NextResponse } from "next/server"
import type { Order } from "@/lib/types"

// Mock storage - trong thực tế sẽ lưu vào database
const orders: Order[] = []

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Thiếu userId" }, { status: 400 })
  }

  const userOrders = orders.filter((order) => order.userId === userId)
  return NextResponse.json(userOrders)
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder: Order = {
      id: Date.now().toString(),
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      status: "pending",
      createdAt: new Date().toISOString(),
      shippingAddress: orderData.shippingAddress,
    }

    orders.push(newOrder)

    return NextResponse.json(newOrder)
  } catch (error) {
    return NextResponse.json({ error: "Không thể tạo đơn hàng" }, { status: 500 })
  }
}
