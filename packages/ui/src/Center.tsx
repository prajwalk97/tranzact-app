import React from "react"

export const Center = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center items-center flex-col h-full">
    {children}
  </div>
}