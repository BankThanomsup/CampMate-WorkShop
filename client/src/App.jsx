import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "@/components/ui/toaster"

const button = () => {
  return (
    
    <div>
      <AppRoutes />
      <Toaster />
    </div>
  )
}

export default button