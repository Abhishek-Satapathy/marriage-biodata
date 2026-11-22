import { createHash, timingSafeEqual } from 'node:crypto'

const safeTextEqual = (left, right) => {
  const leftHash = createHash('sha256').update(String(left)).digest()
  const rightHash = createHash('sha256').update(String(right)).digest()
  return timingSafeEqual(leftHash, rightHash)
}

export const requireOwner = (req, res, next) => {
  const ownerKey = process.env.OWNER_EDIT_KEY
  if (!ownerKey || ownerKey.length < 32) {
    return res.status(503).json({
      success: false,
      message: 'Private editing is not configured. Set OWNER_EDIT_KEY in the server environment.'
    })
  }

  const authorization = req.get('authorization') || ''
  const suppliedKey = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  if (!suppliedKey || !safeTextEqual(suppliedKey, ownerKey)) {
    return res.status(401).json({
      success: false,
      message: 'This private edit link is invalid.'
    })
  }

  return next()
}
