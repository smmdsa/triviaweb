import { Router } from 'express'
import { prisma } from '../prisma'
import { embedRateLimiter } from '../middleware/rateLimit'
import { dispatchLead } from '@trivia/integrations'

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

  // Fire webhooks/integrations (Zapier, HubSpot, etc.)
  dispatchLead({
    id: lead.id,
    triviaId: lead.triviaId,
    companyId: lead.companyId,
    responses: lead.responses.map((r) => ({
      questionId: r.questionId,
      answer: r.answer,
      correct: r.correct,
    })),
  })

  res.status(201).json({ id: lead.id })
})