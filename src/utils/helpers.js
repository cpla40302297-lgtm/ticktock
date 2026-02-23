export const formatNumber = (num) => {
  if (!num && num !== 0) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 10000) return Math.floor(num / 1000) + 'K'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toLocaleString('ko-KR')
}

export const formatPercent = (num) => {
  if (!num) return '0%'
  return num.toFixed(1) + '%'
}

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getRelativeTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '오늘'
  if (days === 1) return '어제'
  if (days < 7) return `${days}일 전`
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  if (days < 365) return `${Math.floor(days / 30)}개월 전`
  return `${Math.floor(days / 365)}년 전`
}

export const getTrendIcon = (trend) => {
  if (trend === 'up') return '↑'
  if (trend === 'down') return '↓'
  return '→'
}

export const getTrendColor = (trend) => {
  if (trend === 'up') return 'text-green-400'
  if (trend === 'down') return 'text-red-400'
  return 'text-gray-400'
}

export const generateGradientColors = (platform) => {
  if (platform === 'tiktok') {
    return { from: '#FE2C55', to: '#25F4EE' }
  }
  if (platform === 'youtube') {
    return { from: '#FF0000', to: '#FF8C00' }
  }
  return { from: '#6366f1', to: '#8b5cf6' }
}
