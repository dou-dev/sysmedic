import express, { json } from 'express'
import cors from 'cors'
import { loginRouter } from './routes/loginRouter.js'

const PORT = process.env.PORT ?? 3030
const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(json())

app.use('/', (req, res) => {
  res.json({ message: 'Sysmedic API' })
})

app.use('login/', loginRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
