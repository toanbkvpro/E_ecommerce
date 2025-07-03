import { NextResponse } from "next/server"
import { products } from "@/lib/data/products"

export async function GET() {
  try {
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Không thể tải sản phẩm" }, { status: 500 })
  }
}
