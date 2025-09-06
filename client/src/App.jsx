import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/context/ThemeContext'

const button = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <AppRoutes />
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default button