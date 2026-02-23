import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 목 데이터 생성 헬퍼
const generateChartData = (days = 30) => {
  const data = []
  let base = Math.floor(Math.random() * 5000) + 2000
  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    base += Math.floor(Math.random() * 500) - 100
    data.push({
      date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      views: Math.max(base, 100),
      likes: Math.floor(base * 0.08),
      comments: Math.floor(base * 0.015),
      shares: Math.floor(base * 0.02),
    })
  }
  return data
}

const generateTikTokVideos = () => [
  {
    id: 'tt1',
    title: '🎵 요즘 핫한 댄스 챌린지 도전해봤어요!',
    thumbnail: null,
    views: 1240000,
    likes: 98500,
    comments: 3240,
    shares: 12600,
    duration: '0:32',
    publishedAt: '2026-02-20',
    hashtags: ['#댄스챌린지', '#틱톡댄스', '#바이럴'],
    trend: 'up',
  },
  {
    id: 'tt2',
    title: '🍜 3분 만에 완성! 초간단 파스타 레시피',
    thumbnail: null,
    views: 856000,
    likes: 72300,
    comments: 1850,
    shares: 9200,
    duration: '2:58',
    publishedAt: '2026-02-18',
    hashtags: ['#쿠킹', '#레시피', '#먹방'],
    trend: 'up',
  },
  {
    id: 'tt3',
    title: '✈️ 혼자 여행 떠나는 방법 솔직 후기',
    thumbnail: null,
    views: 432000,
    likes: 38900,
    comments: 920,
    shares: 4100,
    duration: '1:45',
    publishedAt: '2026-02-15',
    hashtags: ['#여행', '#솔로여행', '#여행vlog'],
    trend: 'stable',
  },
  {
    id: 'tt4',
    title: '😂 직장인 공감 100% 상황 모음',
    thumbnail: null,
    views: 2100000,
    likes: 187000,
    comments: 5600,
    shares: 24000,
    duration: '0:58',
    publishedAt: '2026-02-12',
    hashtags: ['#직장인', '#공감', '#웃긴영상'],
    trend: 'up',
  },
  {
    id: 'tt5',
    title: '💄 10분 완성 데일리 메이크업 튜토리얼',
    thumbnail: null,
    views: 689000,
    likes: 61200,
    comments: 1420,
    shares: 7800,
    duration: '9:48',
    publishedAt: '2026-02-10',
    hashtags: ['#메이크업', '#뷰티', '#튜토리얼'],
    trend: 'down',
  },
]

const generateYouTubeVideos = () => [
  {
    id: 'yt1',
    title: '2026년 유튜브 알고리즘 완벽 분석 (조회수 10배 올리는 방법)',
    thumbnail: null,
    views: 356000,
    likes: 18400,
    comments: 1230,
    duration: '18:42',
    publishedAt: '2026-02-21',
    category: '교육',
    trend: 'up',
    subscribers_gained: 2840,
  },
  {
    id: 'yt2',
    title: '서울에서 부산까지 자전거로 5일 완주 도전기 (완전편)',
    thumbnail: null,
    views: 892000,
    likes: 52100,
    comments: 3400,
    duration: '42:15',
    publishedAt: '2026-02-17',
    category: '여행/모험',
    trend: 'up',
    subscribers_gained: 8900,
  },
  {
    id: 'yt3',
    title: '월 1000만원 버는 프리랜서의 하루 브이로그',
    thumbnail: null,
    views: 1230000,
    likes: 87400,
    comments: 6700,
    duration: '22:38',
    publishedAt: '2026-02-14',
    category: '브이로그',
    trend: 'stable',
    subscribers_gained: 12300,
  },
  {
    id: 'yt4',
    title: '한국 전통 음식 100가지 먹어보기 챌린지',
    thumbnail: null,
    views: 2450000,
    likes: 134000,
    comments: 9800,
    duration: '35:22',
    publishedAt: '2026-02-10',
    category: '음식/먹방',
    trend: 'up',
    subscribers_gained: 24600,
  },
  {
    id: 'yt5',
    title: '파이썬으로 AI 챗봇 만들기 - 완전 초보도 가능!',
    thumbnail: null,
    views: 445000,
    likes: 29800,
    comments: 2100,
    duration: '28:54',
    publishedAt: '2026-02-08',
    category: '프로그래밍',
    trend: 'down',
    subscribers_gained: 3200,
  },
]

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // TikTok 연동 상태
      tiktok: {
        connected: false,
        loading: false,
        error: null,
        profile: null,
        accessToken: null,
        refreshToken: null,
        tokenExpiry: null,
      },

      // YouTube 연동 상태
      youtube: {
        connected: false,
        loading: false,
        error: null,
        profile: null,
        accessToken: null,
        refreshToken: null,
        tokenExpiry: null,
      },

      // TikTok 연동 시작
      connectTikTok: async () => {
        set(state => ({
          tiktok: { ...state.tiktok, loading: true, error: null }
        }))

        try {
          // 실제 환경에서는 OAuth URL로 리디렉션
          // const params = new URLSearchParams({
          //   client_key: import.meta.env.VITE_TIKTOK_CLIENT_KEY,
          //   response_type: 'code',
          //   scope: 'user.info.basic,video.list,video.upload',
          //   redirect_uri: import.meta.env.VITE_TIKTOK_REDIRECT_URI,
          //   state: crypto.randomUUID(),
          // })
          // window.location.href = `https://www.tiktok.com/v2/auth/authorize?${params}`

          // 데모: 1.5초 후 연동 완료 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 1500))

          const mockProfile = {
            id: 'tiktok_user_001',
            username: '@creativecreator_kr',
            displayName: '크리에이티브 크리에이터',
            avatar: null,
            followers: 428500,
            following: 312,
            likes: 3200000,
            videos: 147,
            verified: true,
            bio: '콘텐츠 크리에이터 🎬 | 매주 화/목 업로드 | 비즈니스 문의: dm',
            region: 'KR',
          }

          const chartData = generateChartData(30)
          const videos = generateTikTokVideos()

          set(state => ({
            tiktok: {
              ...state.tiktok,
              connected: true,
              loading: false,
              error: null,
              profile: mockProfile,
              accessToken: 'mock_tiktok_access_token_' + Date.now(),
              analytics: {
                chartData,
                videos,
                totalViews: chartData.reduce((sum, d) => sum + d.views, 0),
                totalLikes: chartData.reduce((sum, d) => sum + d.likes, 0),
                totalComments: chartData.reduce((sum, d) => sum + d.comments, 0),
                totalShares: chartData.reduce((sum, d) => sum + d.shares, 0),
                avgEngagement: 8.4,
                topVideo: videos[3],
              },
            }
          }))
        } catch (error) {
          set(state => ({
            tiktok: {
              ...state.tiktok,
              loading: false,
              error: '연동에 실패했습니다. 다시 시도해주세요.',
            }
          }))
        }
      },

      // TikTok 연동 해제
      disconnectTikTok: () => {
        set({
          tiktok: {
            connected: false,
            loading: false,
            error: null,
            profile: null,
            accessToken: null,
            refreshToken: null,
            tokenExpiry: null,
            analytics: null,
          }
        })
      },

      // YouTube 연동 시작
      connectYouTube: async () => {
        set(state => ({
          youtube: { ...state.youtube, loading: true, error: null }
        }))

        try {
          // 실제 환경에서는 Google OAuth URL로 리디렉션
          // const params = new URLSearchParams({
          //   client_id: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
          //   redirect_uri: import.meta.env.VITE_YOUTUBE_REDIRECT_URI,
          //   response_type: 'code',
          //   scope: [
          //     'https://www.googleapis.com/auth/youtube.readonly',
          //     'https://www.googleapis.com/auth/yt-analytics.readonly',
          //     'https://www.googleapis.com/auth/youtube.upload',
          //   ].join(' '),
          //   access_type: 'offline',
          //   prompt: 'consent',
          //   state: crypto.randomUUID(),
          // })
          // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`

          // 데모: 1.5초 후 연동 완료 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 1500))

          const mockProfile = {
            id: 'youtube_channel_001',
            channelId: 'UCxxxxxxxxxxxxxxxxxxxxxxxx',
            username: 'CreativeCreatorKR',
            displayName: '크리에이티브 크리에이터',
            avatar: null,
            subscribers: 186000,
            totalViews: 12400000,
            videoCount: 89,
            verified: false,
            description: '매주 수/금 업로드 | 여행, 음식, 라이프스타일 콘텐츠',
            country: 'KR',
            joinedDate: '2021-03-15',
            customUrl: '@creativecreator_kr',
          }

          const chartData = generateChartData(30)
          const videos = generateYouTubeVideos()

          set(state => ({
            youtube: {
              ...state.youtube,
              connected: true,
              loading: false,
              error: null,
              profile: mockProfile,
              accessToken: 'mock_youtube_access_token_' + Date.now(),
              analytics: {
                chartData,
                videos,
                totalViews: chartData.reduce((sum, d) => sum + d.views, 0),
                totalLikes: chartData.reduce((sum, d) => sum + d.likes, 0),
                totalComments: chartData.reduce((sum, d) => sum + d.comments, 0),
                totalShares: chartData.reduce((sum, d) => sum + d.shares, 0),
                avgWatchTime: '8분 24초',
                avgEngagement: 5.7,
                subscribersGained: 3420,
                topVideo: videos[3],
              },
            }
          }))
        } catch (error) {
          set(state => ({
            youtube: {
              ...state.youtube,
              loading: false,
              error: '연동에 실패했습니다. 다시 시도해주세요.',
            }
          }))
        }
      },

      // YouTube 연동 해제
      disconnectYouTube: () => {
        set({
          youtube: {
            connected: false,
            loading: false,
            error: null,
            profile: null,
            accessToken: null,
            refreshToken: null,
            tokenExpiry: null,
            analytics: null,
          }
        })
      },

      // 두 플랫폼 모두 연결 해제
      disconnectAll: () => {
        const state = get()
        state.disconnectTikTok()
        state.disconnectYouTube()
      },
    }),
    {
      name: 'social-hub-auth',
      partialize: (state) => ({
        tiktok: {
          connected: state.tiktok.connected,
          profile: state.tiktok.profile,
          accessToken: state.tiktok.accessToken,
          analytics: state.tiktok.analytics,
        },
        youtube: {
          connected: state.youtube.connected,
          profile: state.youtube.profile,
          accessToken: state.youtube.accessToken,
          analytics: state.youtube.analytics,
        },
      }),
    }
  )
)

export const useUIStore = create((set) => ({
  sidebarOpen: false,
  activeTab: 'overview',
  activePlatform: 'all',

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActivePlatform: (platform) => set({ activePlatform: platform }),
}))
