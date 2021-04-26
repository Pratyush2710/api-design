import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'

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

// minimize routes by verbs
const routes = [
  'get /disease',
  'get /disease/:id',
  'post /disease',
  'put /disease/:id',
  'delete /disease/:id'
]
router
  .route('/cat')
  .get()
  .post()

router
  .route('/cat/:id')
  .put()
  .delete()

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

app.use(morgan('dev'))
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
