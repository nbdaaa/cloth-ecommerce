import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(i => i.productId === item.productId)
        
        if (existingItem) {
          // If item already exists, update quantity
          return get().updateQuantity(
            item.productId, 
            existingItem.quantity + item.quantity
          )
        }
        
        // Add new item with a unique id
        const newItem = {
          ...item,
          id: `${item.productId}-${Date.now()}`
        }
        
        set((state) => {
          const updatedItems = [...state.items, newItem]
          
          return {
            items: updatedItems,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + (item.price * item.quantity)
          }
        })
      },
      
      removeItem: (productId) => {
        const { items } = get()
        const itemToRemove = items.find(item => item.productId === productId)
        
        if (!itemToRemove) return
        
        set((state) => {
          const updatedItems = state.items.filter(item => item.productId !== productId)
          
          return {
            items: updatedItems,
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
          }
        })
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get()
        
        // Ensure quantity is at least 1
        const safeQuantity = Math.max(1, quantity)
        
        set((state) => {
          const updatedItems = state.items.map(item => {
            if (item.productId === productId) {
              const quantityDiff = safeQuantity - item.quantity
              state.totalItems += quantityDiff
              state.totalPrice += item.price * quantityDiff
              
              return { ...item, quantity: safeQuantity }
            }
            return item
          })
          
          return { 
            items: updatedItems,
            totalItems: state.totalItems,
            totalPrice: state.totalPrice
          }
        })
      },
      
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 })
      }
    }),
    {
      name: 'cart-storage', // name of the localStorage key
    }
  )
) 