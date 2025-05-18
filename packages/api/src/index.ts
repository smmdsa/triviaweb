import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import { authMiddleware } from './middleware/auth'
import { triviaRouter } from './routes/trivia'
import { leadRouter } from './routes/lead'
import { gdprRouter } from './routes/gdpr'

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

// API Docs
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Trivia API', version: '0.1.0' },
  },
  apis: [], // future JSDoc annotations
})
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use('/api/trivias', authMiddleware, triviaRouter)
app.use('/api/leads', leadRouter)
app.use('/api/gdpr', authMiddleware, gdprRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})