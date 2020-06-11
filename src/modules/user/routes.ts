import express, { Response, Request } from 'express'

import UserOperations from './controller'

import { controllerResponse } from './interface'


const router = express.Router()

router.post('/signup', async ({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.echoUser(body)

    res.status(response.code).json({
        error: response.error,
        message: response.message,
        payload: response.payload,
    })
})

export default router