import { Router } from 'express'
import { prisma } from '../prisma'
import { embedRateLimiter } from '../middleware/rateLimit'

export const leadRouter = Router()

// POST /leads
leadRouter.post('/', embedRateLimiter, async (req, res) => {
  const { triviaId, responses, contact } = req.body
  if (!triviaId || !responses) return res.status(400).json({ message: 'invalid' })

  const lead = await prisma.lead.create({
    data: {
      triviaId,
      companyId: contact?.companyId || 'demo',
      responses: {
        createMany: {
          data: responses.map((r: any) => ({
            questionId: r.questionId,
            answer: r.answer,
            correct: r.correct,
          })),
        },
      },
    },
    include: { responses: true },
  })

  // TODO webhook dispatch (INT1)

  res.status(201).json({ id: lead.id })
})