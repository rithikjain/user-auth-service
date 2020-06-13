import { ObjectId } from 'bson'

export interface signupParams {
    _id?: ObjectId
    timestamp: string
    fullname: string
    email: string
    password: string
}

export interface controllerResponse {
    code: number
    error: boolean
    message: string
    payload: any
}