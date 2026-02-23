import React, { Suspense } from 'react'
import { useUIStore } from './store/authStore'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import OverviewPage from './pages/OverviewPage'
import ConnectPage from './pages/ConnectPage'
import VideosPage from './pages/VideosPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'

const pageTitles = {
  overview: { title: '대시보드', subtitle: '소셜 미디어 통합 현황' },
  videos: { title: '동영상 관리', subtitle: 'TikTok · YouTube 콘텐츠' },
  analytics: { title: '분석', subtitle: '성과 데이터 및 인사이트' },
  connect: { title: '연동 관리', subtitle: 'OAuth 플랫폼 연결' },
  settings: { title: '설정', subtitle: '앱 환경 설정' },
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="spinner w-10 h-10" />
        <p className="text-white/40 text-sm">로딩 중...</p>
      </div>
    </div>
  )
}

export default function App() {
  const { activeTab } = useUIStore()
  const { title, subtitle } = pageTitles[activeTab] || pageTitles.overview

  const renderPage = () => {
    switch (activeTab) {
      case 'overview': return <OverviewPage />
      case 'videos': return <VideosPage />
      case 'analytics': return <AnalyticsPage />
      case 'connect': return <ConnectPage />
      case 'settings': return <SettingsPage />
      default: return <OverviewPage />
    }
  }

  return (
    <div className="animated-bg min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header title={title} subtitle={subtitle} />

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<LoadingSpinner />}>
            {renderPage()}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
