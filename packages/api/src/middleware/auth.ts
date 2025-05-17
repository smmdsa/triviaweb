import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret' // replace in prod

export interface AuthedRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export function authMiddleware(req: AuthedRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' })
  }
  const token = auth.slice(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; email: string }
    req.user = { id: decoded.sub, email: decoded.email }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}