import { Router } from 'express'

const router = Router()

const controller = (req, res) => {
  res.send({ message: 'Hello' })
}
router
  .route('/')
  .get(controller)
  .post(controller)

router
  .route('/:id')
  .put(controller)
  .delete(controller)
  .get(controller)

export default router
