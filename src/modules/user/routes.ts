import express, { Response, Request } from 'express'

import UserOperations from './controller'

import { controllerResponse } from './interface'
import Result from '../utils/result'
import verifyToken from '../../middleware/jwt'


const router = express.Router()

router.post('/signup', async ({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.signUpUser(body)
    Result.Json(res, response)
})

router.post('/signin', async({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.signInUser(body)
    Result.Json(res, response)
})

router.get('/details', verifyToken, async(req: Request, res: Response) => {
    const response: controllerResponse = await UserOperations.viewDetails(res.locals.userID)
    Result.Json(res, response)
})

export default router