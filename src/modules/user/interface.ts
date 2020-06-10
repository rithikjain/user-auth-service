import { ObjectId } from 'bson'

export interface signupParams {
    _id?: ObjectId
    readonly username: string
    readonly fullname: string
    readonly email: string
    readonly password: string
}

export interface controllerResponse {
    code: number
    error: boolean
    message: string
    payload: any
}