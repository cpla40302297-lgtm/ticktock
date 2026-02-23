import React from 'react'
import { useAuthStore, useUIStore } from '../store/authStore'
import { BellIcon, RefreshIcon } from './Icons'

export default function Header({ title, subtitle }) {
  const { tiktok, youtube } = useAuthStore()
  const { setSidebarOpen } = useUIStore()
  const connectedCount = [tiktok.connected, youtube.connected].filter(Boolean).length

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0a0a16]/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Mobile menu button + Title */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div>
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          {subtitle && <p className="text-white/40 text-sm">{subtitle}</p>}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Platform status badges */}
        <div className="hidden sm:flex items-center gap-2">
          {tiktok.connected && (
            <span className="platform-badge tiktok text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FE2C55] animate-pulse" />
              TikTok
            </span>
          )}
          {youtube.connected && (
            <span className="platform-badge youtube text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
              YouTube
            </span>
          )}
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all">
          <BellIcon size={18} />
          {connectedCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FE2C55] rounded-full" />
          )}
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] flex items-center justify-center text-white text-sm font-bold">
          U
        </div>
      </div>
    </header>
  )
}
