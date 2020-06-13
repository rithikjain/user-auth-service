import { Response, Request, NextFunction } from 'express'
import Result from '../modules/utils/result'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = <string>req.headers['authorization']
    const token: string = authHeader.split(' ')[1]
    if (token == null) {
        return Result.Json(res, Result.UnAuthorizedError())
    }

    try {
        const { userID } = <any>jwt.verify(token, process.env.JWT_SECRET as string)
        res.locals.userID = userID
        return next()
    } catch (err) {
        return Result.Json(res, Result.ForbiddenError())
    }
}

export default verifyToken