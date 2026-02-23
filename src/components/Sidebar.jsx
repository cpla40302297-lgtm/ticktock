import React, { useState } from 'react'
import { useAuthStore, useUIStore } from '../store/authStore'
import {
  TikTokIcon, YouTubeIcon, GridIcon, VideoIcon,
  BarChartIcon, SettingsIcon, LinkIcon, BellIcon
} from './Icons'

const navItems = [
  { id: 'overview', label: '대시보드', icon: GridIcon },
  { id: 'videos', label: '동영상 관리', icon: VideoIcon },
  { id: 'analytics', label: '분석', icon: BarChartIcon },
  { id: 'connect', label: '연동 관리', icon: LinkIcon },
  { id: 'settings', label: '설정', icon: SettingsIcon },
]

export default function Sidebar() {
  const { tiktok, youtube } = useAuthStore()
  const { activeTab, setActiveTab, sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          sidebar fixed md:sticky top-0 left-0 h-screen w-64 z-50
          flex flex-col bg-[#0a0a16] border-r border-white/8
          transition-transform duration-300
          ${sidebarOpen ? 'open' : ''}
          md:transform-none md:translate-x-0
        `}
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] flex items-center justify-center text-xl">
              📱
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Social Hub</h1>
              <p className="text-white/40 text-xs">소셜 미디어 관리</p>
            </div>
          </div>
        </div>

        {/* Connected platforms */}
        <div className="p-4 border-b border-white/8">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3 px-2">연동된 플랫폼</p>
          <div className="space-y-2">
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              tiktok.connected
                ? 'bg-[#FE2C55]/10 border border-[#FE2C55]/20'
                : 'bg-white/3 border border-white/8'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                tiktok.connected ? 'bg-black' : 'bg-white/10'
              }`}>
                <TikTokIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">TikTok</p>
                {tiktok.connected && tiktok.profile ? (
                  <p className="text-white/50 text-xs truncate">{tiktok.profile.username}</p>
                ) : (
                  <p className="text-white/30 text-xs">미연동</p>
                )}
              </div>
              <div className={`w-2 h-2 rounded-full ${tiktok.connected ? 'bg-green-400' : 'bg-white/20'}`} />
            </div>

            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              youtube.connected
                ? 'bg-[#FF0000]/10 border border-[#FF0000]/20'
                : 'bg-white/3 border border-white/8'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                youtube.connected ? 'bg-[#FF0000]' : 'bg-white/10'
              }`}>
                <YouTubeIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">YouTube</p>
                {youtube.connected && youtube.profile ? (
                  <p className="text-white/50 text-xs truncate">{youtube.profile.customUrl}</p>
                ) : (
                  <p className="text-white/30 text-xs">미연동</p>
                )}
              </div>
              <div className={`w-2 h-2 rounded-full ${youtube.connected ? 'bg-green-400' : 'bg-white/20'}`} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3 px-2">메뉴</p>
          <ul className="space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setActiveTab(id)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${activeTab === id
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                    }
                  `}
                >
                  <Icon size={18} className={activeTab === id ? 'text-white' : 'text-white/50'} />
                  {label}
                  {id === 'connect' && (tiktok.connected || youtube.connected) && (
                    <span className="ml-auto bg-green-400/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                      {[tiktok.connected, youtube.connected].filter(Boolean).length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/8">
          <p className="text-white/20 text-xs text-center">Social Hub v1.0</p>
          <p className="text-white/15 text-xs text-center mt-1">© 2026 All rights reserved</p>
        </div>
      </aside>
    </>
  )
}
