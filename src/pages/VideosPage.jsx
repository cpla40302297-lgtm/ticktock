import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { TikTokIcon, YouTubeIcon, ViewsIcon, HeartIcon, CommentIcon, ShareIcon, ClockIcon, VideoIcon } from '../components/Icons'
import { formatNumber, getRelativeTime, getTrendColor, getTrendIcon } from '../utils/helpers'

// TikTok Video Card
function TikTokVideoCard({ video }) {
  return (
    <div className="glass rounded-xl p-4 hover:bg-white/8 transition-all duration-200 cursor-pointer group">
      {/* Thumbnail placeholder */}
      <div className="aspect-[9/16] max-w-[100px] rounded-lg mb-3 flex items-center justify-center text-3xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%)' }}
      >
        <span className="text-white/80">🎬</span>
        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#FE2C55] transition-colors mb-2">
          {video.title}
        </h4>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {video.hashtags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[#FE2C55]/70 text-[10px] bg-[#FE2C55]/10 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '👁️', value: formatNumber(video.views), label: '조회수' },
            { icon: '❤️', value: formatNumber(video.likes), label: '좋아요' },
            { icon: '💬', value: formatNumber(video.comments), label: '댓글' },
            { icon: '↪️', value: formatNumber(video.shares), label: '공유' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs">{s.icon}</span>
              <span className="text-white/70 text-xs">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Date + trend */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
          <span className="text-white/30 text-xs">{getRelativeTime(video.publishedAt)}</span>
          <span className={`text-xs font-medium flex items-center gap-1 ${getTrendColor(video.trend)}`}>
            {getTrendIcon(video.trend)} {video.trend === 'up' ? '상승' : video.trend === 'down' ? '하락' : '유지'}
          </span>
        </div>
      </div>
    </div>
  )
}

// YouTube Video Card
function YouTubeVideoCard({ video }) {
  return (
    <div className="glass rounded-xl p-4 hover:bg-white/8 transition-all duration-200 cursor-pointer group">
      {/* Thumbnail placeholder */}
      <div className="aspect-video rounded-lg mb-3 flex items-center justify-center text-3xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FF0000 0%, #FF8C00 100%)' }}
      >
        <span className="text-white/80 text-4xl">▶</span>
        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      <div>
        <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#FF4444] transition-colors mb-2">
          {video.title}
        </h4>

        {/* Category */}
        <span className="text-[#FF0000]/70 text-[10px] bg-[#FF0000]/10 px-2 py-0.5 rounded-full mb-3 inline-block">
          {video.category}
        </span>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '👁️', value: formatNumber(video.views), label: '조회수' },
            { icon: '👍', value: formatNumber(video.likes), label: '좋아요' },
            { icon: '💬', value: formatNumber(video.comments), label: '댓글' },
            { icon: '🔔', value: formatNumber(video.subscribers_gained), label: '신규 구독' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs">{s.icon}</span>
              <span className="text-white/70 text-xs">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Date + trend */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
          <span className="text-white/30 text-xs">{getRelativeTime(video.publishedAt)}</span>
          <span className={`text-xs font-medium flex items-center gap-1 ${getTrendColor(video.trend)}`}>
            {getTrendIcon(video.trend)} {video.trend === 'up' ? '상승' : video.trend === 'down' ? '하락' : '유지'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Empty state for videos
function VideoEmptyState({ platform, onConnect }) {
  const isTikTok = platform === 'tiktok'
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${isTikTok ? 'bg-black' : 'bg-[#0f0f0f]'}`}>
        {isTikTok ? <TikTokIcon size={40} /> : <YouTubeIcon size={40} />}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">
        {isTikTok ? 'TikTok' : 'YouTube'}이 연동되지 않았습니다
      </h3>
      <p className="text-white/40 text-sm mb-6">연동 후 동영상 목록을 확인할 수 있어요</p>
      <button onClick={onConnect} className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${isTikTok ? 'btn-tiktok' : 'btn-youtube'}`}>
        {isTikTok ? <TikTokIcon size={18} /> : <YouTubeIcon size={18} />}
        지금 연동하기
      </button>
    </div>
  )
}

export default function VideosPage() {
  const { tiktok, youtube, connectTikTok, connectYouTube } = useAuthStore()
  const [activePlatform, setActivePlatform] = useState('all')
  const [sortBy, setSortBy] = useState('views')

  const tabs = [
    { id: 'all', label: '전체', icon: '📱' },
    { id: 'tiktok', label: 'TikTok', icon: null },
    { id: 'youtube', label: 'YouTube', icon: null },
  ]

  const sortOptions = [
    { value: 'views', label: '조회수순' },
    { value: 'likes', label: '좋아요순' },
    { value: 'date', label: '최신순' },
  ]

  const sortVideos = (videos) => {
    if (!videos) return []
    return [...videos].sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views
      if (sortBy === 'likes') return b.likes - a.likes
      if (sortBy === 'date') return new Date(b.publishedAt) - new Date(a.publishedAt)
      return 0
    })
  }

  const tiktokVideos = sortVideos(tiktok.analytics?.videos)
  const youtubeVideos = sortVideos(youtube.analytics?.videos)

  const totalVideos =
    (tiktok.connected ? tiktokVideos.length : 0) +
    (youtube.connected ? youtubeVideos.length : 0)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-2xl">동영상 관리</h2>
          <p className="text-white/40 text-sm mt-1">
            {totalVideos > 0 ? `총 ${totalVideos}개 동영상` : '연동 후 동영상을 확인하세요'}
          </p>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-white/30"
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value} className="bg-[#1a1a2e]">{o.label}</option>
          ))}
        </select>
      </div>

      {/* Platform tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/8 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActivePlatform(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activePlatform === tab.id
                ? tab.id === 'tiktok'
                  ? 'bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/30'
                  : tab.id === 'youtube'
                  ? 'bg-[#FF0000]/20 text-[#FF4444] border border-[#FF0000]/30'
                  : 'bg-white/10 text-white border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon ? (
              <span>{tab.icon}</span>
            ) : tab.id === 'tiktok' ? (
              <div className="w-4 h-4 bg-black rounded flex items-center justify-center">
                <TikTokIcon size={10} />
              </div>
            ) : (
              <div className="w-4 h-4 bg-[#FF0000] rounded flex items-center justify-center">
                <YouTubeIcon size={10} />
              </div>
            )}
            {tab.label}
            {tab.id === 'tiktok' && tiktok.connected && (
              <span className="bg-[#FE2C55]/20 text-[#FE2C55] text-[10px] px-1.5 py-0.5 rounded-full">
                {tiktokVideos.length}
              </span>
            )}
            {tab.id === 'youtube' && youtube.connected && (
              <span className="bg-[#FF0000]/20 text-[#FF4444] text-[10px] px-1.5 py-0.5 rounded-full">
                {youtubeVideos.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TikTok videos */}
      {(activePlatform === 'all' || activePlatform === 'tiktok') && (
        <div className="mb-8">
          {activePlatform === 'all' && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
                <TikTokIcon size={16} />
              </div>
              <h3 className="text-white font-semibold">TikTok 동영상</h3>
              {tiktok.connected && (
                <span className="text-white/30 text-sm">({tiktokVideos.length}개)</span>
              )}
            </div>
          )}

          {tiktok.connected ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tiktokVideos.map(video => (
                <TikTokVideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1">
              <VideoEmptyState platform="tiktok" onConnect={connectTikTok} />
            </div>
          )}
        </div>
      )}

      {/* YouTube videos */}
      {(activePlatform === 'all' || activePlatform === 'youtube') && (
        <div>
          {activePlatform === 'all' && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-[#FF0000] rounded-lg flex items-center justify-center">
                <YouTubeIcon size={16} />
              </div>
              <h3 className="text-white font-semibold">YouTube 동영상</h3>
              {youtube.connected && (
                <span className="text-white/30 text-sm">({youtubeVideos.length}개)</span>
              )}
            </div>
          )}

          {youtube.connected ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {youtubeVideos.map(video => (
                <YouTubeVideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1">
              <VideoEmptyState platform="youtube" onConnect={connectYouTube} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
