import express, { Response, Request } from 'express'
import UserOperations from './controller'
import { controllerResponse } from './interface'
import Result from '../utils/result'
import verifyToken from '../../middleware/jwt'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/signup', async ({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.signUpUser(body)
    Result.Json(res, response)
})

router.post('/signin', async({ body }, res: Response) => {
    const response: controllerResponse = await UserOperations.signInUser(body)
    Result.Json(res, response)
})

router.get('/verify/:emailToken', async(req: Request, res: Response) => {
    try {
        const { userID } = <any>jwt.verify(req.params.emailToken, process.env.EMAIL_JWT_SECRET as string)
        const result = await UserOperations.verifyEmail(userID)
        if (result) {
            return res.status(200).send('Account Verified!')
        } else {
            return res.status(500).send('Something went wrong on our side')
        }
    } catch (err) {
        return res.status(403).send('Something wrong with the token')
    }
})

router.get('/details', verifyToken, async(req: Request, res: Response) => {
    const response: controllerResponse = await UserOperations.viewDetails(res.locals.userID)
    Result.Json(res, response)
})

export default router