import { type NextRequest, NextResponse } from "next/server"
import type { User } from "@/lib/types"

// Mock users storage
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    password: "admin123",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Kiểm tra email đã tồn tại
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Email đã được sử dụng" }, { status: 400 })
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      password,
    }

    users.push(newUser)

    // Không trả về password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json({ error: "Lỗi đăng ký" }, { status: 500 })
  }
}
