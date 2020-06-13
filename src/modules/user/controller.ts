import { signupParams, controllerResponse } from "./interface"
import { db } from '../database/mongodb'
import logger from '../../middleware/winston'
import Result from "../utils/result"

class UserOperations {
    static async signUpUser(user: signupParams): Promise<controllerResponse> {
        try {
            // Check if email exists
            const tempUser = await db.collection('users').findOne({email: user.email})
            if (tempUser != null) {
                return Result.Error(403, "User with this email exists")
            } 

            user.timestamp = Date()
            await db.collection('users').insertOne(user)
            logger.info('New user created')

            return Result.Success(201, 'User created', user)
        } catch (err) {
            logger.error('Error creating user')
            return Result.Error(500, "Fatal DB Error")
        }
    }
}

export default UserOperations