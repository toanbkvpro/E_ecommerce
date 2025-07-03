"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Product, CartItem, User, Order } from "../types"

interface AppState {
  user: User | null
  cart: CartItem[]
  orders: Order[]
  products: Product[]
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "SET_ORDERS"; payload: Order[] }

const initialState: AppState = {
  user: null,
  cart: [],
  orders: [],
  products: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.product.id === action.payload.product.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload.product, quantity: action.payload.quantity }],
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      }
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] }
    case "SET_ORDERS":
      return { ...state, orders: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedCart = localStorage.getItem("cart")
    const savedOrders = localStorage.getItem("orders")

    if (savedUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) })
    }
    if (savedCart) {
      dispatch({ type: "SET_ORDERS", payload: JSON.parse(savedCart) })
    }
    if (savedOrders) {
      dispatch({ type: "SET_ORDERS", payload: JSON.parse(savedOrders) })
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("user")
    }
  }, [state.user])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(state.orders))
  }, [state.orders])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
