import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev')) // logger

const log = (req, res, next) => {
  console.log('logging')
  next() // order to run next middleware
}
// methods to use middleware
// ---- set globally
app.use(log)

// use specific to method
// app.get('/', log, (req, res) => {
// us multiple middlewares
// app.get('/',[], (req, res) => {

// subrouting
router.get('/me', (req, res) => {
  res.send({ subRouter: true })
})
app.use('/api', router)

app.get('/', (req, res) => {
  res.send({ message: 'Hello' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'OK' })
})

app.get('/data', (req, res) => {
  res.send({ message: 'Hello' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
