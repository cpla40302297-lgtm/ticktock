import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { SettingsIcon } from '../components/Icons'

export default function SettingsPage() {
  const { tiktok, youtube, disconnectAll } = useAuthStore()
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('ko')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <SettingsIcon size={20} className="text-white/70" />
          </div>
          <h2 className="text-white font-bold text-2xl">설정</h2>
        </div>
        <p className="text-white/40 text-sm">앱 설정과 환경을 관리하세요</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="stats-card">
          <h3 className="text-white font-semibold mb-4">일반 설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">언어</p>
                <p className="text-white/40 text-xs">앱 표시 언어를 설정합니다</p>
              </div>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none"
              >
                <option value="ko" className="bg-[#1a1a2e]">한국어</option>
                <option value="en" className="bg-[#1a1a2e]">English</option>
                <option value="ja" className="bg-[#1a1a2e]">日本語</option>
              </select>
            </div>

            <div className="border-t border-white/8 pt-4 flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">테마</p>
                <p className="text-white/40 text-xs">앱 색상 테마</p>
              </div>
              <div className="flex gap-2">
                {['dark', 'light', 'auto'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      theme === t
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/40 hover:text-white/70'
                    }`}
                  >
                    {t === 'dark' ? '다크' : t === 'light' ? '라이트' : '자동'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="stats-card">
          <h3 className="text-white font-semibold mb-4">알림 설정</h3>
          <div className="space-y-4">
            {[
              { key: 'email', label: '이메일 알림', desc: '주요 성과 변화를 이메일로 받기' },
              { key: 'push', label: '푸시 알림', desc: '브라우저 알림 활성화' },
              { key: 'weekly', label: '주간 리포트', desc: '매주 월요일 성과 요약 리포트' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{label}</p>
                  <p className="text-white/40 text-xs">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    notifications[key] ? 'bg-green-500' : 'bg-white/15'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    notifications[key] ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="stats-card">
          <h3 className="text-white font-semibold mb-4">연동된 계정</h3>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              tiktok.connected ? 'bg-[#FE2C55]/10 border border-[#FE2C55]/20' : 'bg-white/5 border border-white/8'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                    <path d="M22.5 5.5C21.7 4.6 21.2 3.4 21.2 2H16.5V20.5C16.4 21.8 15.4 22.9 14 22.9C12.6 22.9 11.5 21.8 11.5 20.4C11.5 18.7 13 17.4 14.8 17.8V13C10.5 12.6 7 16 7 20.4C7 24.8 10.6 28.3 14.9 28C19.1 27.7 22.2 24.1 22.2 19.8V11.2C23.8 12.4 25.8 13.1 28 13.1V8.4C28 8.4 24.9 8.6 22.5 5.5Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">TikTok</p>
                  <p className="text-white/40 text-xs">
                    {tiktok.connected ? tiktok.profile?.username : '연동 안 됨'}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                tiktok.connected ? 'bg-green-400/10 text-green-400' : 'text-white/30'
              }`}>
                {tiktok.connected ? '연동됨' : '미연동'}
              </span>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl ${
              youtube.connected ? 'bg-[#FF0000]/10 border border-[#FF0000]/20' : 'bg-white/5 border border-white/8'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF0000] rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                    <path d="M29.2 9.8C28.9 8.6 27.9 7.7 26.7 7.4C24.5 6.8 16 6.8 16 6.8C16 6.8 7.5 6.8 5.3 7.4C4.1 7.7 3.1 8.7 2.8 9.8C2.2 12 2.2 16.5 2.2 16.5C2.2 16.5 2.2 21 2.8 23.2C3.1 24.4 4.1 25.3 5.3 25.6C7.5 26.2 16 26.2 16 26.2C16 26.2 24.5 26.2 26.7 25.6C27.9 25.3 28.9 24.3 29.2 23.2C29.8 21 29.8 16.5 29.8 16.5C29.8 16.5 29.8 12 29.2 9.8Z" fill="white"/>
                    <path d="M13.2 20.5L20.8 16.5L13.2 12.5V20.5Z" fill="#FF0000"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">YouTube</p>
                  <p className="text-white/40 text-xs">
                    {youtube.connected ? youtube.profile?.customUrl : '연동 안 됨'}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                youtube.connected ? 'bg-green-400/10 text-green-400' : 'text-white/30'
              }`}>
                {youtube.connected ? '연동됨' : '미연동'}
              </span>
            </div>
          </div>

          {(tiktok.connected || youtube.connected) && (
            <button
              onClick={() => {
                if (window.confirm('모든 연동을 해제하시겠습니까?')) disconnectAll()
              }}
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              모든 연동 해제
            </button>
          )}
        </div>

        {/* API Settings */}
        <div className="stats-card">
          <h3 className="text-white font-semibold mb-1">API 설정</h3>
          <p className="text-white/40 text-xs mb-4">실제 OAuth 연동을 위한 API 키 설정</p>
          <div className="bg-black/30 rounded-xl p-4 border border-white/8 font-mono text-xs space-y-2">
            <div className="text-green-400/60"># .env 파일에 추가하세요</div>
            <div className="text-white/50">VITE_TIKTOK_CLIENT_KEY=<span className="text-yellow-300/50">your_key</span></div>
            <div className="text-white/50">VITE_TIKTOK_REDIRECT_URI=<span className="text-yellow-300/50">your_uri</span></div>
            <div className="text-white/50">VITE_YOUTUBE_CLIENT_ID=<span className="text-yellow-300/50">your_id</span></div>
            <div className="text-white/50">VITE_YOUTUBE_REDIRECT_URI=<span className="text-yellow-300/50">your_uri</span></div>
          </div>
          <p className="text-white/30 text-xs mt-3">
            * Client Secret은 백엔드 서버에서만 사용하세요. 프론트엔드에 절대 노출 금지.
          </p>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
          }`}
        >
          {saved ? '✅ 저장 완료!' : '설정 저장'}
        </button>
      </div>
    </div>
  )
}
