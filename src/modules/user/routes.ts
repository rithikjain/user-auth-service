import express, { Response } from 'express'

import UserOperations from './controller'

import { controllerResponse, signupParams } from './interface'
import Respond from '../utils/response'


const router = express.Router()

router.post('/signup', async ({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.echoUser(body)

    Respond.Json(res, response)
})

export default router