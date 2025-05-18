import { Router } from 'express'
import { prisma } from '../prisma'
import { AuthedRequest } from '../middleware/auth'

export const triviaRouter = Router()

// GET /trivias (paginated)
triviaRouter.get('/', async (req, res) => {
  const page = parseInt((req.query.page as string) || '1')
  const take = 20
  const trivias = await prisma.trivia.findMany({
    skip: (page - 1) * take,
    take,
    orderBy: { createdAt: 'desc' },
  })
  res.json(trivias)
})

// POST /trivias
triviaRouter.post('/', async (req: AuthedRequest, res) => {
  const { title, questions } = req.body
  if (!title) return res.status(400).json({ message: 'title required' })
  const trivia = await prisma.trivia.create({
    data: {
      title,
      creatorId: req.user?.id,
      companyId: req.user?.id || 'demo',
      questions: {
        createMany: {
          data: questions?.map((q: any, idx: number) => ({
            text: q.text,
            options: q.options,
            answer: q.answer,
            order: idx + 1,
          })) || [],
        },
      },
    },
    include: { questions: true },
  })
  res.status(201).json(trivia)
})

// PATCH /trivias/:id
triviaRouter.patch('/:id', async (req: AuthedRequest, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const updated = await prisma.trivia.update({ where: { id }, data })
    res.json(updated)
  } catch {
    res.status(404).json({ message: 'Not found' })
  }
})

// GET /trivias/:id/embed
triviaRouter.get('/:id/embed', async (req, res) => {
  const { id } = req.params
  const trivia = await prisma.trivia.findUnique({
    where: { id },
    include: { questions: true },
  })
  if (!trivia) return res.status(404).json({})
  res.json({
    id: trivia.id,
    title: trivia.title,
    questions: trivia.questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
    })),
  })
})