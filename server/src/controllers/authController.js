import {
  createOwnerToken,
  isOwnerPasswordValid,
  ownerSessionLifetimeMs
} from '../middleware/authMiddleware.js'

const attemptsByIp = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 6

export const loginOwner = (req, res) => {
  if (!process.env.OWNER_PASSWORD || process.env.OWNER_PASSWORD.length < 12) {
    return res.status(503).json({
      success: false,
      message: 'Owner access is not configured. Set an OWNER_PASSWORD with at least 12 characters.'
    })
  }

  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    return res.status(503).json({
      success: false,
      message: 'Owner access is not configured. Set a SESSION_SECRET with at least 32 characters.'
    })
  }

  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const current = attemptsByIp.get(ip)
  if (current && Date.now() - current.startedAt < WINDOW_MS && current.count >= MAX_ATTEMPTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many sign-in attempts. Please wait 15 minutes and try again.'
    })
  }

  if (!isOwnerPasswordValid(req.body?.password)) {
    const record = current && Date.now() - current.startedAt < WINDOW_MS
      ? current
      : { count: 0, startedAt: Date.now() }
    record.count += 1
    attemptsByIp.set(ip, record)

    return res.status(401).json({
      success: false,
      message: 'That password does not match.'
    })
  }

  attemptsByIp.delete(ip)

  return res.status(200).json({
    success: true,
    token: createOwnerToken(),
    expiresIn: ownerSessionLifetimeMs
  })
}
