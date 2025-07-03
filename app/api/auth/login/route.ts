import { type NextRequest, NextResponse } from "next/server"
import type { User } from "@/lib/types"

// Mock users - trong thực tế sẽ lưu trong database với mật khẩu đã hash
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
    const { email, password } = await request.json()

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Email hoặc mật khẩu không đúng" }, { status: 401 })
    }

    // Không trả về password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json({ error: "Lỗi đăng nhập" }, { status: 500 })
  }
}
