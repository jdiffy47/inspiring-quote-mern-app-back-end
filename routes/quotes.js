import { Router } from 'express'
import * as quotesCtrl from '../controllers/quotes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, quotesCtrl.create)

export {
  router
}