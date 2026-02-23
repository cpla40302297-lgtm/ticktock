import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { TikTokIcon, YouTubeIcon, TrendingUpIcon } from '../components/Icons'
import { formatNumber } from '../utils/helpers'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

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

function PlatformAnalytics({ platform, data, color, gradientId }) {
  const recentData = data?.chartData?.slice(-14) || []

  if (!data) return null

  return (
    <div className="space-y-4">
      {/* Line chart - views */}
      <div className="stats-card">
        <h4 className="text-white font-medium mb-4">조회수 추이 (14일)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={recentData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => formatNumber(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="views" name="조회수" stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart - engagement */}
      <div className="stats-card">
        <h4 className="text-white font-medium mb-4">인게이지먼트 분석</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={recentData.slice(-7)} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => formatNumber(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="likes" name="좋아요" fill={color} opacity={0.8} radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" name="댓글" fill={color} opacity={0.5} radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" name="공유" fill={color} opacity={0.3} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie - engagement breakdown */}
      <div className="stats-card">
        <h4 className="text-white font-medium mb-4">인게이지먼트 비율</h4>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="50%" height={180}>
            <PieChart>
              <Pie
                data={[
                  { name: '좋아요', value: data.totalLikes },
                  { name: '댓글', value: data.totalComments },
                  { name: '공유', value: data.totalShares },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                <Cell fill={color} opacity={1} />
                <Cell fill={color} opacity={0.6} />
                <Cell fill={color} opacity={0.35} />
              </Pie>
              <Tooltip formatter={(v) => formatNumber(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-1/2 space-y-3 pl-4">
            {[
              { label: '좋아요', value: data.totalLikes, opacity: 1 },
              { label: '댓글', value: data.totalComments, opacity: 0.6 },
              { label: '공유', value: data.totalShares, opacity: 0.35 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: color, opacity: item.opacity }} />
                  <span className="text-white/60 text-sm">{item.label}</span>
                </div>
                <span className="text-white text-sm font-medium">{formatNumber(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const { tiktok, youtube } = useAuthStore()
  const [activeTab, setActiveTab] = useState('compare')

  const tabs = [
    { id: 'compare', label: '비교 분석' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'youtube', label: 'YouTube' },
  ]

  // 비교 차트 데이터
  const compareData = (() => {
    if (!tiktok.analytics && !youtube.analytics) return []
    const ttData = tiktok.analytics?.chartData || []
    const ytData = youtube.analytics?.chartData || []
    const len = Math.max(ttData.length, ytData.length)
    return Array.from({ length: Math.min(14, len) }, (_, i) => {
      const idx = len - 14 + i
      return {
        date: ttData[idx]?.date || ytData[idx]?.date || `Day ${i+1}`,
        'TikTok': ttData[idx]?.views || 0,
        'YouTube': ytData[idx]?.views || 0,
      }
    })
  })()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white font-bold text-2xl">분석</h2>
        <p className="text-white/40 text-sm mt-1">플랫폼별 성과를 분석하세요</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/8 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.id === 'tiktok' && <div className="w-4 h-4 bg-black rounded flex items-center justify-center"><TikTokIcon size={10} /></div>}
            {tab.id === 'youtube' && <div className="w-4 h-4 bg-[#FF0000] rounded flex items-center justify-center"><YouTubeIcon size={10} /></div>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Compare tab */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          {(!tiktok.connected && !youtube.connected) ? (
            <div className="stats-card text-center py-16">
              <p className="text-white/40 text-lg mb-2">📊</p>
              <p className="text-white/60">플랫폼을 연동하면 분석 데이터를 확인할 수 있어요</p>
            </div>
          ) : (
            <>
              {/* 플랫폼 비교 지표 */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* TikTok summary */}
                <div className={`stats-card ${tiktok.connected ? 'tiktok-glow' : 'opacity-40'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <TikTokIcon size={20} />
                    </div>
                    <h3 className="text-white font-semibold">TikTok 요약</h3>
                    {!tiktok.connected && <span className="text-white/30 text-xs">미연동</span>}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: '총 조회수', value: tiktok.analytics?.totalViews },
                      { label: '총 좋아요', value: tiktok.analytics?.totalLikes },
                      { label: '평균 인게이지먼트', value: null, custom: tiktok.analytics?.avgEngagement + '%' },
                      { label: '팔로워', value: tiktok.profile?.followers },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-white/50 text-sm">{s.label}</span>
                        <span className="text-white font-medium text-sm">
                          {s.custom || (s.value !== undefined ? formatNumber(s.value) : '—')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* YouTube summary */}
                <div className={`stats-card ${youtube.connected ? 'youtube-glow' : 'opacity-40'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#FF0000] rounded-lg flex items-center justify-center">
                      <YouTubeIcon size={20} />
                    </div>
                    <h3 className="text-white font-semibold">YouTube 요약</h3>
                    {!youtube.connected && <span className="text-white/30 text-xs">미연동</span>}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: '총 조회수', value: youtube.analytics?.totalViews },
                      { label: '총 좋아요', value: youtube.analytics?.totalLikes },
                      { label: '평균 시청 시간', value: null, custom: youtube.analytics?.avgWatchTime },
                      { label: '구독자', value: youtube.profile?.subscribers },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-white/50 text-sm">{s.label}</span>
                        <span className="text-white font-medium text-sm">
                          {s.custom || (s.value !== undefined ? formatNumber(s.value) : '—')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compare chart */}
              {compareData.length > 0 && (
                <div className="stats-card">
                  <h4 className="text-white font-semibold mb-4">플랫폼 조회수 비교 (14일)</h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={compareData}>
                      <defs>
                        <linearGradient id="ttCompare" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FE2C55" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="ytCompare" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => formatNumber(v)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{v}</span>} />
                      {tiktok.connected && <Area type="monotone" dataKey="TikTok" stroke="#FE2C55" strokeWidth={2} fill="url(#ttCompare)" />}
                      {youtube.connected && <Area type="monotone" dataKey="YouTube" stroke="#FF4444" strokeWidth={2} fill="url(#ytCompare)" />}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* TikTok tab */}
      {activeTab === 'tiktok' && (
        tiktok.connected && tiktok.analytics ? (
          <PlatformAnalytics
            platform="tiktok"
            data={tiktok.analytics}
            color="#FE2C55"
            gradientId="ttAnalytics"
          />
        ) : (
          <div className="stats-card text-center py-16">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <TikTokIcon size={36} />
            </div>
            <p className="text-white/60">TikTok을 먼저 연동해주세요</p>
          </div>
        )
      )}

      {/* YouTube tab */}
      {activeTab === 'youtube' && (
        youtube.connected && youtube.analytics ? (
          <PlatformAnalytics
            platform="youtube"
            data={youtube.analytics}
            color="#FF4444"
            gradientId="ytAnalytics"
          />
        ) : (
          <div className="stats-card text-center py-16">
            <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <YouTubeIcon size={36} />
            </div>
            <p className="text-white/60">YouTube를 먼저 연동해주세요</p>
          </div>
        )
      )}
    </div>
  )
}
