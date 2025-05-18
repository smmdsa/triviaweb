import { Router } from 'express'
import { prisma } from '../prisma'
import { AuthedRequest } from '../middleware/auth'

export const gdprRouter = Router()

// GET /gdpr/export – returns user data
gdprRouter.get('/export', async (req: AuthedRequest, res) => {
  if (!req.user) return res.status(401).json({})
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { trivias: true },
  })
  res.json(user)
})

// DELETE /gdpr/delete – deletes user and related data
gdprRouter.delete('/delete', async (req: AuthedRequest, res) => {
  if (!req.user) return res.status(401).json({})
  await prisma.user.delete({ where: { id: req.user.id } })
  res.status(204).end()
})