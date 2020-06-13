import express, { Response } from 'express'

import UserOperations from './controller'

import { controllerResponse, signupParams } from './interface'
import Result from '../utils/result'


const router = express.Router()

router.post('/signup', async ({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.signUpUser(body)
    Result.Json(res, response)
})

router.post('/signin', async({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.signInUser(body)
    Result.Json(res, response)
})

export default router