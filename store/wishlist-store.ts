import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  inStock: boolean
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, 'id'>) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get()
        
        // Check if item already exists in wishlist
        if (items.some(i => i.productId === item.productId)) {
          return
        }
        
        // Add new item with a unique id
        const newItem = {
          ...item,
          id: `wish-${item.productId}-${Date.now()}`
        }
        
        set((state) => ({
          items: [...state.items, newItem]
        }))
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }))
      },
      
      isInWishlist: (productId) => {
        const { items } = get()
        return items.some(item => item.productId === productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'wishlist-storage', // name of the localStorage key
    }
  )
) 