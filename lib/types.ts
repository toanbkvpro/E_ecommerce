export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  password?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: string
  shippingAddress: {
    name: string
    address: string
    city: string
    phone: string
  }
}
