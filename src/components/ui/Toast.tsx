import { create } from "zustand"
import * as React from "react"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'success' | 'warning' | 'error'
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToast = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast = { ...toast, id }
    set((state) => ({ toasts: [...state.toasts, newToast] }))

    // Auto remove after duration
    const duration = toast.duration || 3000
    setTimeout(() => {
      get().removeToast(id)
    }, duration)
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
  }
}))

const variantStyles = {
  default: "bg-gray-800 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-500 text-black",
  error: "bg-red-600 text-white",
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg ${variantStyles[toast.variant || 'default']} animate-bounce-small cursor-pointer`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="font-bold text-lg">{toast.title}</div>
          {toast.description && (
            <div className="text-sm mt-1 opacity-90">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export function useToastHook() {
  const addToast = useToast(state => state.addToast)

  return {
    toast: (options: Omit<Toast, 'id'>) => addToast(options)
  }
}