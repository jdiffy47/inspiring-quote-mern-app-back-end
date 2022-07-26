import { Router } from 'express'
import * as quotesCtrl from '../controllers/quotes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', quotesCtrl.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, quotesCtrl.create)
router.delete('/:id', checkAuth, quotesCtrl.delete)
router.put('/:id', checkAuth, quotesCtrl.update)

export {
  router
}