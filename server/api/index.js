import express from 'express'
import HubRouter from './i3hub'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// CORS - Remove in production
app.use(cors())
// i3hub endpoint handler
app.use('/_hub_', HubRouter)
// Other handlers
app.post('/session', (req, res) => {
  const sessionId = uuidv4()
  return res.json(sessionId)
})

export default app
