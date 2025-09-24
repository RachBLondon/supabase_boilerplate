import { create } from 'zustand'

interface FormState {
  email: string
  password: string
  errors: Record<string, string>
  setField: (field: string, value: string) => void
  setError: (field: string, error: string) => void
  clearErrors: () => void
  reset: () => void
}

export const useFormStore = create<FormState>((set) => ({
  email: '',
  password: '',
  errors: {},
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setError: (field, error) => set((state) => ({ 
    ...state, 
    errors: { ...state.errors, [field]: error } 
  })),
  clearErrors: () => set({ errors: {} }),
  reset: () => set({ email: '', password: '', errors: {} })
}))
