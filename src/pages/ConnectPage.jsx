import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { TikTokIcon, YouTubeIcon, CheckCircleIcon, XCircleIcon, LinkIcon, UsersIcon, ViewsIcon, HeartIcon } from '../components/Icons'
import { formatNumber } from '../utils/helpers'

// TikTok Connect Card
function TikTokConnectCard() {
  const { tiktok, connectTikTok, disconnectTikTok } = useAuthStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleConnect = () => {
    connectTikTok()
  }

  const handleDisconnect = () => {
    if (showConfirm) {
      disconnectTikTok()
      setShowConfirm(false)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-500 ${
      tiktok.connected
        ? 'border-[#FE2C55]/30 tiktok-glow'
        : 'border-white/10'
    }`}
      style={{
        background: tiktok.connected
          ? 'linear-gradient(135deg, rgba(254,44,85,0.08), rgba(37,244,238,0.05))'
          : 'rgba(255,255,255,0.03)'
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center relative">
              <TikTokIcon size={32} />
              {tiktok.connected && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a16] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              )}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">TikTok</h3>
              <p className="text-white/50 text-sm mt-0.5">
                {tiktok.connected ? '연동됨' : '연동 안 됨'}
              </p>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
            tiktok.connected
              ? 'bg-green-400/10 text-green-400 border-green-400/20'
              : 'bg-white/5 text-white/40 border-white/10'
          }`}>
            {tiktok.connected ? '● 활성' : '○ 비활성'}
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: '프로필 조회', icon: '👤' },
            { label: '동영상 관리', icon: '🎬' },
            { label: '분석 데이터', icon: '📊' },
          ].map((f, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              tiktok.connected ? 'bg-[#FE2C55]/10 text-white/70' : 'bg-white/5 text-white/30'
            }`}>
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile (if connected) */}
      {tiktok.connected && tiktok.profile && (
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] flex items-center justify-center text-2xl flex-shrink-0">
              🎭
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-semibold">{tiktok.profile.displayName}</h4>
                {tiktok.profile.verified && (
                  <span className="text-[#FE2C55]">
                    <CheckCircleIcon size={14} />
                  </span>
                )}
              </div>
              <p className="text-white/50 text-sm">{tiktok.profile.username}</p>
              <p className="text-white/40 text-xs mt-1 truncate">{tiktok.profile.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: '팔로워', value: formatNumber(tiktok.profile.followers), icon: '👥' },
              { label: '좋아요', value: formatNumber(tiktok.profile.likes), icon: '❤️' },
              { label: '동영상', value: tiktok.profile.videos, icon: '🎬' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-white/40 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Permissions */}
      <div className="px-6 py-4">
        <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">필요 권한</p>
        <div className="space-y-2">
          {[
            { scope: 'user.info.basic', desc: '기본 프로필 정보 읽기' },
            { scope: 'video.list', desc: '동영상 목록 조회' },
            { scope: 'video.upload', desc: '동영상 업로드' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                tiktok.connected ? 'bg-green-400/20' : 'bg-white/10'
              }`}>
                {tiktok.connected
                  ? <span className="text-green-400 text-[10px]">✓</span>
                  : <span className="text-white/30 text-[10px]">·</span>
                }
              </div>
              <div>
                <span className="text-white/70 text-xs font-mono">{p.scope}</span>
                <span className="text-white/30 text-xs ml-2">— {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      {tiktok.error && (
        <div className="mx-6 mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-sm">{tiktok.error}</p>
        </div>
      )}

      {/* Action Button */}
      <div className="p-6 pt-2">
        {tiktok.connected ? (
          <button
            onClick={handleDisconnect}
            className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              showConfirm
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
            }`}
          >
            {showConfirm ? '⚠️ 정말 연동 해제하시겠습니까? (다시 클릭)' : '연동 해제'}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={tiktok.loading}
            className="w-full py-3 rounded-xl text-sm font-semibold btn-tiktok disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {tiktok.loading ? (
              <>
                <div className="spinner w-4 h-4" />
                <span>연동 중...</span>
              </>
            ) : (
              <>
                <TikTokIcon size={18} />
                <span>TikTok 연동하기</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// YouTube Connect Card
function YouTubeConnectCard() {
  const { youtube, connectYouTube, disconnectYouTube } = useAuthStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleConnect = () => {
    connectYouTube()
  }

  const handleDisconnect = () => {
    if (showConfirm) {
      disconnectYouTube()
      setShowConfirm(false)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-500 ${
      youtube.connected
        ? 'border-[#FF0000]/30 youtube-glow'
        : 'border-white/10'
    }`}
      style={{
        background: youtube.connected
          ? 'linear-gradient(135deg, rgba(255,0,0,0.08), rgba(255,140,0,0.05))'
          : 'rgba(255,255,255,0.03)'
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0f0f0f] flex items-center justify-center relative">
              <YouTubeIcon size={32} />
              {youtube.connected && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a16] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              )}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">YouTube</h3>
              <p className="text-white/50 text-sm mt-0.5">
                {youtube.connected ? '연동됨' : '연동 안 됨'}
              </p>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
            youtube.connected
              ? 'bg-green-400/10 text-green-400 border-green-400/20'
              : 'bg-white/5 text-white/40 border-white/10'
          }`}>
            {youtube.connected ? '● 활성' : '○ 비활성'}
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: '채널 분석', icon: '📈' },
            { label: '동영상 관리', icon: '🎥' },
            { label: '수익 데이터', icon: '💰' },
          ].map((f, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              youtube.connected ? 'bg-[#FF0000]/10 text-white/70' : 'bg-white/5 text-white/30'
            }`}>
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile (if connected) */}
      {youtube.connected && youtube.profile && (
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF0000] to-[#FF8C00] flex items-center justify-center text-2xl flex-shrink-0">
              🎬
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-semibold">{youtube.profile.displayName}</h4>
              </div>
              <p className="text-white/50 text-sm">{youtube.profile.customUrl}</p>
              <p className="text-white/40 text-xs mt-1 truncate">{youtube.profile.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: '구독자', value: formatNumber(youtube.profile.subscribers), icon: '🔔' },
              { label: '총 조회수', value: formatNumber(youtube.profile.totalViews), icon: '👁️' },
              { label: '동영상', value: youtube.profile.videoCount, icon: '🎥' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-white/40 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Permissions */}
      <div className="px-6 py-4">
        <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">필요 권한 (Google OAuth 2.0)</p>
        <div className="space-y-2">
          {[
            { scope: 'youtube.readonly', desc: '채널 및 동영상 조회' },
            { scope: 'yt-analytics.readonly', desc: '유튜브 애널리틱스 데이터' },
            { scope: 'youtube.upload', desc: '동영상 업로드' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                youtube.connected ? 'bg-green-400/20' : 'bg-white/10'
              }`}>
                {youtube.connected
                  ? <span className="text-green-400 text-[10px]">✓</span>
                  : <span className="text-white/30 text-[10px]">·</span>
                }
              </div>
              <div>
                <span className="text-white/70 text-xs font-mono">{p.scope}</span>
                <span className="text-white/30 text-xs ml-2">— {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      {youtube.error && (
        <div className="mx-6 mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-sm">{youtube.error}</p>
        </div>
      )}

      {/* Action Button */}
      <div className="p-6 pt-2">
        {youtube.connected ? (
          <button
            onClick={handleDisconnect}
            className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              showConfirm
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
            }`}
          >
            {showConfirm ? '⚠️ 정말 연동 해제하시겠습니까? (다시 클릭)' : '연동 해제'}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={youtube.loading}
            className="w-full py-3 rounded-xl text-sm font-semibold btn-youtube disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {youtube.loading ? (
              <>
                <div className="spinner w-4 h-4 border-t-[#FF0000]" />
                <span>연동 중...</span>
              </>
            ) : (
              <>
                <YouTubeIcon size={18} />
                <span>YouTube 연동하기</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// OAuth 설정 가이드
function OAuthGuide() {
  const [activeGuide, setActiveGuide] = useState('tiktok')

  const guides = {
    tiktok: {
      title: 'TikTok for Developers 설정',
      color: '#FE2C55',
      steps: [
        { step: 1, title: 'TikTok Developers 등록', desc: 'developers.tiktok.com에서 앱 등록', link: 'https://developers.tiktok.com' },
        { step: 2, title: 'App 생성', desc: '새 앱을 생성하고 플랫폼 설정 (Web)' },
        { step: 3, title: 'OAuth 범위 설정', desc: 'user.info.basic, video.list, video.upload 권한 요청' },
        { step: 4, title: 'Client Key 발급', desc: 'Client Key와 Client Secret 복사' },
        { step: 5, title: 'Redirect URI 설정', desc: `${window.location.origin}/auth/tiktok/callback 등록` },
        { step: 6, title: '환경변수 설정', desc: 'VITE_TIKTOK_CLIENT_KEY를 .env에 추가' },
      ],
      envVars: [
        'VITE_TIKTOK_CLIENT_KEY=your_client_key',
        'VITE_TIKTOK_CLIENT_SECRET=your_client_secret',
        'VITE_TIKTOK_REDIRECT_URI=https://yourdomain.com/auth/tiktok/callback',
      ]
    },
    youtube: {
      title: 'Google Cloud Console 설정',
      color: '#FF0000',
      steps: [
        { step: 1, title: 'Google Cloud Console', desc: 'console.cloud.google.com에서 프로젝트 생성', link: 'https://console.cloud.google.com' },
        { step: 2, title: 'YouTube Data API v3 활성화', desc: 'API 및 서비스 > 라이브러리에서 YouTube API 활성화' },
        { step: 3, title: 'OAuth 동의 화면 구성', desc: '앱 이름, 승인된 도메인, 범위(scopes) 설정' },
        { step: 4, title: '사용자 인증 정보 생성', desc: 'OAuth 2.0 클라이언트 ID 생성 (웹 애플리케이션)' },
        { step: 5, title: 'Redirect URI 등록', desc: `${window.location.origin}/auth/youtube/callback 추가` },
        { step: 6, title: '환경변수 설정', desc: 'VITE_YOUTUBE_CLIENT_ID를 .env에 추가' },
      ],
      envVars: [
        'VITE_YOUTUBE_CLIENT_ID=your_client_id.apps.googleusercontent.com',
        'VITE_YOUTUBE_CLIENT_SECRET=your_client_secret',
        'VITE_YOUTUBE_REDIRECT_URI=https://yourdomain.com/auth/youtube/callback',
      ]
    }
  }

  const guide = guides[activeGuide]

  return (
    <div className="mt-8 rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="p-6 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">🔧 OAuth 연동 설정 가이드</h3>
            <p className="text-white/40 text-sm mt-1">실제 서비스 연동을 위한 설정 방법</p>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'tiktok', label: 'TikTok', color: '#FE2C55' },
              { id: 'youtube', label: 'YouTube', color: '#FF0000' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setActiveGuide(p.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeGuide === p.id
                    ? 'text-white'
                    : 'text-white/40 bg-white/5 hover:text-white/70'
                }`}
                style={activeGuide === p.id ? { background: p.color + '30', border: `1px solid ${p.color}40` } : {}}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Steps */}
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">설정 단계</h4>
            <div className="space-y-3">
              {guide.steps.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: guide.color + '20', color: guide.color, border: `1px solid ${guide.color}30` }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">{s.title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{s.desc}</p>
                    {s.link && (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-1 inline-block hover:underline"
                        style={{ color: guide.color }}
                      >
                        → {s.link}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Env vars */}
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">환경 변수 (.env)</h4>
            <div className="bg-black/40 rounded-xl p-4 border border-white/8 font-mono">
              <div className="text-green-400/60 text-xs mb-3"># {guide.title}</div>
              {guide.envVars.map((v, i) => (
                <div key={i} className="text-green-300/80 text-xs py-1">{v}</div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5">
              <p className="text-yellow-400 text-xs font-medium mb-1">⚠️ 보안 주의사항</p>
              <p className="text-white/40 text-xs">
                Client Secret은 절대 프론트엔드에 노출하지 마세요.
                토큰 교환은 반드시 백엔드 서버에서 처리해야 합니다.
              </p>
            </div>

            <div className="mt-3 p-4 rounded-xl border border-blue-400/20 bg-blue-400/5">
              <p className="text-blue-400 text-xs font-medium mb-1">ℹ️ 현재 모드</p>
              <p className="text-white/40 text-xs">
                현재는 데모 모드로 실행 중입니다. 실제 API 키를 설정하면
                진짜 OAuth 연동이 동작합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConnectPage() {
  const { tiktok, youtube } = useAuthStore()
  const connectedCount = [tiktok.connected, youtube.connected].filter(Boolean).length

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <LinkIcon size={20} />
          </div>
          <div>
            <h1 className="text-white font-bold text-2xl">연동 관리</h1>
            <p className="text-white/40 text-sm">소셜 미디어 플랫폼을 연결하고 관리하세요</p>
          </div>
        </div>

        {/* Status summary */}
        <div className="flex items-center gap-3 mt-4">
          <div className={`px-4 py-2 rounded-xl text-sm font-medium border ${
            connectedCount === 2
              ? 'bg-green-400/10 text-green-400 border-green-400/20'
              : connectedCount === 1
              ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
              : 'bg-white/5 text-white/40 border-white/10'
          }`}>
            {connectedCount === 0 && '연동된 플랫폼 없음'}
            {connectedCount === 1 && `1개 플랫폼 연동됨`}
            {connectedCount === 2 && '✅ 모든 플랫폼 연동됨'}
          </div>
          <p className="text-white/30 text-sm">
            {connectedCount === 0 && '아래에서 플랫폼을 연동하세요'}
            {connectedCount === 1 && '나머지 플랫폼도 연동해보세요'}
            {connectedCount === 2 && '대시보드에서 통합 분석을 확인하세요'}
          </p>
        </div>
      </div>

      {/* Platform cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <TikTokConnectCard />
        <YouTubeConnectCard />
      </div>

      {/* OAuth Guide */}
      <OAuthGuide />
    </div>
  )
}
