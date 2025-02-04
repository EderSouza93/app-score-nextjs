import React, { ReactNode } from 'react'

interface BackgroundLayoutProps {
  children: ReactNode
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F2F6FA]">
      {/* Background curve */}
      <div className="absolute w-full h-full">
        <div className="absolute top-0 w-full h-2/3 bg-[#F2F6FA]" />
        <div
          className="absolute top-0 w-full h-1/2 bg-white"
          style={{
            borderBottomLeftRadius: '75% 75%',
            borderBottomRightRadius: '75% 75%',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default BackgroundLayout
