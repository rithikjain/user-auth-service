import { controllerResponse } from "../user/interface"
import { Response } from 'express'

class Result {
    static Success(code: number, message: string, payload: any) {
        return {
            code: code,
            error: false,
            message: message, 
            payload: payload,
        }
    }

    static Error(code: number, message: string) {
        return {
            code: code,
            error: true,
            message: message,
            payload: null,
        }
    }

    static Json(res: Response, response: controllerResponse) {
        res.status(response.code).json({
            error: response.error,
            message: response.message,
            payload: response.payload,
        })
    }
}

export default Result