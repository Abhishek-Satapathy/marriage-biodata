import { createHash, timingSafeEqual } from 'node:crypto'

const failedAttempts = new Map()
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000
const MAX_FAILED_ATTEMPTS = 8

const safeTextEqual = (left, right) => {
  const leftHash = createHash('sha256').update(String(left)).digest()
  const rightHash = createHash('sha256').update(String(right)).digest()
  return timingSafeEqual(leftHash, rightHash)
}

const recordFailure = (ipAddress, now) => {
  const current = failedAttempts.get(ipAddress)
  const next = current && now - current.startedAt < ATTEMPT_WINDOW_MS
    ? { startedAt: current.startedAt, count: current.count + 1 }
    : { startedAt: now, count: 1 }
  failedAttempts.set(ipAddress, next)
  return next
}

export const requireOwner = (req, res, next) => {
  const ownerKey = process.env.OWNER_EDIT_KEY || ''
  if (!/^\d{6}$/.test(ownerKey)) {
    return res.status(503).json({
      success: false,
      message: 'Private editing is not configured. Set OWNER_EDIT_KEY to exactly six digits.'
    })
  }

  const authorization = req.get('authorization') || ''
  const suppliedKey = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  if (suppliedKey && safeTextEqual(suppliedKey, ownerKey)) {
    failedAttempts.delete(req.ip)
    return next()
  }

  const now = Date.now()
  const current = failedAttempts.get(req.ip)
  if (current && now - current.startedAt < ATTEMPT_WINDOW_MS && current.count >= MAX_FAILED_ATTEMPTS) {
    res.set('Retry-After', String(Math.ceil((ATTEMPT_WINDOW_MS - (now - current.startedAt)) / 1000)))
    return res.status(429).json({
      success: false,
      message: 'Too many incorrect edit-key attempts. Please try again later.'
    })
  }

  recordFailure(req.ip, now)
  return res.status(401).json({
    success: false,
    message: 'This private edit link is invalid.'
  })
}
