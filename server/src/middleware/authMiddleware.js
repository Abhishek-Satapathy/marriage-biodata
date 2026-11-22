import { createHmac, createHash, timingSafeEqual } from 'node:crypto'

const SESSION_LIFETIME_MS = 12 * 60 * 60 * 1000

const safeTextEqual = (left, right) => {
  const leftHash = createHash('sha256').update(String(left)).digest()
  const rightHash = createHash('sha256').update(String(right)).digest()
  return timingSafeEqual(leftHash, rightHash)
}

const signatureFor = (encodedPayload, secret) =>
  createHmac('sha256', secret).update(encodedPayload).digest('base64url')

export const createOwnerToken = () => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must contain at least 32 characters')
  }

  const payload = Buffer.from(JSON.stringify({
    role: 'owner',
    expiresAt: Date.now() + SESSION_LIFETIME_MS
  })).toString('base64url')

  return payload + '.' + signatureFor(payload, secret)
}

export const isOwnerPasswordValid = (password) => {
  const expected = process.env.OWNER_PASSWORD
  if (!expected) return false
  return safeTextEqual(password || '', expected)
}

const isValidOwnerToken = (token) => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32 || !token) return false

  const [payload, signature, extra] = token.split('.')
  if (!payload || !signature || extra) return false

  const expectedSignature = signatureFor(payload, secret)
  if (!safeTextEqual(signature, expectedSignature)) return false

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return decoded.role === 'owner' && decoded.expiresAt > Date.now()
  } catch {
    return false
  }
}

export const requireOwner = (req, res, next) => {
  const authorization = req.get('authorization') || ''
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : ''

  if (!isValidOwnerToken(token)) {
    return res.status(401).json({
      success: false,
      message: 'Please sign in to manage this biodata.'
    })
  }

  return next()
}

export const ownerSessionLifetimeMs = SESSION_LIFETIME_MS
