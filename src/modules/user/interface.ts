import { ObjectId } from 'bson'

export interface userParams {
    _id?: ObjectId
    timestamp: string
    fullname: string
    email: string
    password: string
    isVerified: boolean
}

export interface signinParams {
    email: string
    password: string
}

export interface controllerResponse {
    code: number
    error: boolean
    message: string
    payload: any
}