import { ObjectId } from 'bson'

interface signupParams {
    _id?: ObjectId
    readonly username: string
    readonly fullname: string
    readonly email: string
    readonly password: string
}

export interface signupObject {
    user: signupParams
}

export interface controllerResponse {
    code: number
    error: boolean
    message: string
    payload: any
}