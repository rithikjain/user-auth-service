import { signupParams, controllerResponse } from "./interface"
import { db } from '../database/mongodb'
import logger from '../../middleware/winston'
import Respond from "../utils/response"

class UserOperations {
    static async signUpUser(user: signupParams): Promise<controllerResponse> {
        try {
            user.timestamp = Date()
            await db.collection('users').insertOne(user)
            logger.info('New user created')
            return Respond.Success(201, 'User created', null)
        } catch (err) {
            logger.error('Error creating user')
            return Respond.Error(500, "Fatal DB Error")
        }
    }
}

export default UserOperations