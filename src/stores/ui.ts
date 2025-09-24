import { create } from 'zustand'

interface UIStore {
  toast: { message: string; type: 'success' | 'error' | 'info' } | null
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  hideToast: () => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  toast: null,
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading })
}))
