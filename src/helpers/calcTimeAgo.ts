export function timeAgo(dateString: string): string {
  const now = new Date()
  const then = new Date(dateString)
  let diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ]

  const result: string[] = []

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds)
    if (value >= 1) {
      result.push(`${value} ${unit.name}${value > 1 ? 's' : ''}`)
      // return up to two units, like "1 year and 2 months"
      if (result.length === 2) break
      diffInSeconds -= value * unit.seconds
    }
  }

  return result.length ? `${result.join(' and ')}` : 'just now'
}
