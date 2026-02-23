import React from 'react'
import { useAuthStore } from '../store/authStore'
import { TikTokIcon, YouTubeIcon, ViewsIcon, HeartIcon, CommentIcon, ShareIcon, UsersIcon, TrendingUpIcon, BarChartIcon } from '../components/Icons'
import { formatNumber, getTrendColor, getTrendIcon } from '../utils/helpers'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

// 통계 카드
function StatCard({ label, value, change, icon, color, platform }) {
  const isPositive = change > 0

  return (
    <div className="stats-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + '20' }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {change !== undefined && (
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
            isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
          }`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-white/50 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-2xl">{formatNumber(value)}</p>
      {platform && (
        <div className="mt-2">
          <span className={`platform-badge ${platform} text-[10px]`}>
            {platform === 'tiktok' ? 'TikTok' : 'YouTube'}
          </span>
        </div>
      )}
    </div>
  )
}

// 커스텀 툴팁
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl p-3 border border-white/10">
        <p className="text-white/60 text-xs mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-white/70">{entry.name}:</span>
            <span className="text-white font-medium">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// 통합 차트
function CombinedChart({ tiktokData, youtubeData }) {
  const combined = tiktokData.map((d, i) => ({
    date: d.date,
    'TikTok 조회수': d.views,
    'YouTube 조회수': youtubeData[i]?.views || 0,
    'TikTok 좋아요': d.likes,
    'YouTube 좋아요': youtubeData[i]?.likes || 0,
  }))

  const recentData = combined.slice(-14)

  return (
    <div className="stats-card col-span-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-lg">통합 성과 추이</h3>
          <p className="text-white/40 text-sm mt-1">최근 14일 TikTok + YouTube</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-3 h-0.5 bg-[#FE2C55] rounded inline-block" />
            TikTok
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-3 h-0.5 bg-[#FF0000] rounded inline-block" />
            YouTube
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={recentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ttGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FE2C55" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ytGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => formatNumber(v)} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="TikTok 조회수" stroke="#FE2C55" strokeWidth={2} fill="url(#ttGrad)" />
          <Area type="monotone" dataKey="YouTube 조회수" stroke="#FF0000" strokeWidth={2} fill="url(#ytGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// 빈 상태 (연동 전)
function EmptyState({ platform }) {
  const { connectTikTok, connectYouTube } = useAuthStore()
  const isTikTok = platform === 'tiktok'

  return (
    <div className="stats-card flex flex-col items-center justify-center py-12 text-center">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
        isTikTok ? 'bg-black' : 'bg-[#0f0f0f]'
      }`}>
        {isTikTok ? <TikTokIcon size={36} /> : <YouTubeIcon size={36} />}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">
        {isTikTok ? 'TikTok' : 'YouTube'} 미연동
      </h3>
      <p className="text-white/40 text-sm mb-6 max-w-xs">
        {isTikTok ? 'TikTok' : 'YouTube'} 계정을 연동하면
        이 곳에서 통계를 확인할 수 있어요
      </p>
      <button
        onClick={isTikTok ? connectTikTok : connectYouTube}
        className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
          isTikTok ? 'btn-tiktok' : 'btn-youtube'
        }`}
      >
        {isTikTok ? <TikTokIcon size={18} /> : <YouTubeIcon size={18} />}
        지금 연동하기
      </button>
    </div>
  )
}

// TikTok 섹션
function TikTokSection({ tiktok }) {
  if (!tiktok.connected) return <EmptyState platform="tiktok" />

  const { profile, analytics } = tiktok

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="stats-card tiktok-glow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] flex items-center justify-center text-xl flex-shrink-0">
            🎭
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-white font-bold">{profile.displayName}</h4>
              {profile.verified && <span className="text-[#FE2C55] text-xs">✓ 인증됨</span>}
            </div>
            <p className="text-white/50 text-sm">{profile.username}</p>
          </div>
          <span className="platform-badge tiktok">TikTok</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: '팔로워', value: profile.followers, icon: '👥' },
            { label: '팔로잉', value: profile.following, icon: '➡️' },
            { label: '받은 좋아요', value: profile.likes, icon: '❤️' },
          ].map((s, i) => (
            <div key={i} className="bg-[#FE2C55]/5 rounded-xl p-3 text-center border border-[#FE2C55]/10">
              <p className="text-xl mb-1">{s.icon}</p>
              <p className="text-white font-bold">{formatNumber(s.value)}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics stats */}
      {analytics && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '조회수 (30일)', value: analytics.totalViews, change: +12.4 },
            { label: '좋아요 (30일)', value: analytics.totalLikes, change: +8.1 },
            { label: '댓글 (30일)', value: analytics.totalComments, change: -2.3 },
            { label: '공유 (30일)', value: analytics.totalShares, change: +18.7 },
          ].map((s, i) => (
            <div key={i} className="bg-[#FE2C55]/5 border border-[#FE2C55]/10 rounded-xl p-3">
              <p className="text-white/50 text-xs mb-1">{s.label}</p>
              <p className="text-white font-bold text-lg">{formatNumber(s.value)}</p>
              <span className={`text-xs ${s.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {s.change > 0 ? '+' : ''}{s.change}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// YouTube 섹션
function YouTubeSection({ youtube }) {
  if (!youtube.connected) return <EmptyState platform="youtube" />

  const { profile, analytics } = youtube

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="stats-card youtube-glow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF0000] to-[#FF8C00] flex items-center justify-center text-xl flex-shrink-0">
            🎬
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold">{profile.displayName}</h4>
            <p className="text-white/50 text-sm">{profile.customUrl}</p>
          </div>
          <span className="platform-badge youtube">YouTube</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: '구독자', value: profile.subscribers, icon: '🔔' },
            { label: '총 조회수', value: profile.totalViews, icon: '👁️' },
            { label: '동영상 수', value: profile.videoCount, icon: '🎥' },
          ].map((s, i) => (
            <div key={i} className="bg-[#FF0000]/5 rounded-xl p-3 text-center border border-[#FF0000]/10">
              <p className="text-xl mb-1">{s.icon}</p>
              <p className="text-white font-bold">{formatNumber(s.value)}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics stats */}
      {analytics && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '조회수 (30일)', value: analytics.totalViews, change: +15.2 },
            { label: '좋아요 (30일)', value: analytics.totalLikes, change: +5.8 },
            { label: '댓글 (30일)', value: analytics.totalComments, change: +3.1 },
            { label: '신규 구독자', value: analytics.subscribersGained, change: +22.4 },
          ].map((s, i) => (
            <div key={i} className="bg-[#FF0000]/5 border border-[#FF0000]/10 rounded-xl p-3">
              <p className="text-white/50 text-xs mb-1">{s.label}</p>
              <p className="text-white font-bold text-lg">{formatNumber(s.value)}</p>
              <span className={`text-xs ${s.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {s.change > 0 ? '+' : ''}{s.change}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OverviewPage() {
  const { tiktok, youtube } = useAuthStore()
  const bothConnected = tiktok.connected && youtube.connected
  const anyConnected = tiktok.connected || youtube.connected

  // 합산 통계
  const totalStats = {
    views: (tiktok.analytics?.totalViews || 0) + (youtube.analytics?.totalViews || 0),
    likes: (tiktok.analytics?.totalLikes || 0) + (youtube.analytics?.totalLikes || 0),
    comments: (tiktok.analytics?.totalComments || 0) + (youtube.analytics?.totalComments || 0),
    followers: (tiktok.profile?.followers || 0) + (youtube.profile?.subscribers || 0),
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome / Summary */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(254,44,85,0.1), rgba(255,0,0,0.08), rgba(37,244,238,0.05))',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div className="relative z-10">
          <h2 className="text-white font-bold text-2xl mb-1">
            안녕하세요! 👋
          </h2>
          <p className="text-white/60 text-sm">
            {anyConnected
              ? `${[tiktok.connected && 'TikTok', youtube.connected && 'YouTube'].filter(Boolean).join(' · ')} 연동 완료`
              : '플랫폼을 연동하고 소셜 미디어를 한 곳에서 관리하세요'
            }
          </p>
        </div>

        {/* Background decorations */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FE2C55, transparent)' }} />
        <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF0000, transparent)' }} />
      </div>

      {/* Total stats (when both connected) */}
      {anyConnected && (
        <div>
          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">📊 전체 통합 지표 (30일)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="총 조회수" value={totalStats.views} change={13.5} icon={<ViewsIcon size={18} />} color="#818cf8" />
            <StatCard label="총 좋아요" value={totalStats.likes} change={6.9} icon={<HeartIcon size={18} />} color="#f472b6" />
            <StatCard label="총 댓글" value={totalStats.comments} change={2.1} icon={<CommentIcon size={18} />} color="#34d399" />
            <StatCard label="총 팔로워/구독자" value={totalStats.followers} change={18.2} icon={<UsersIcon size={18} />} color="#fbbf24" />
          </div>
        </div>
      )}

      {/* Combined chart */}
      {bothConnected && tiktok.analytics && youtube.analytics && (
        <div>
          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">📈 플랫폼 비교 차트</h3>
          <CombinedChart
            tiktokData={tiktok.analytics.chartData}
            youtubeData={youtube.analytics.chartData}
          />
        </div>
      )}

      {/* Platform sections */}
      <div>
        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">🔗 플랫폼별 현황</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                <TikTokIcon size={14} />
              </div>
              <h4 className="text-white font-medium">TikTok</h4>
            </div>
            <TikTokSection tiktok={tiktok} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#FF0000] rounded-lg flex items-center justify-center">
                <YouTubeIcon size={14} />
              </div>
              <h4 className="text-white font-medium">YouTube</h4>
            </div>
            <YouTubeSection youtube={youtube} />
          </div>
        </div>
      </div>
    </div>
  )
}
