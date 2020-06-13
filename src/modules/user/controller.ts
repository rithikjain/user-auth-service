import { signupParams, controllerResponse } from "./interface"
import { db } from '../database/mongodb'
import logger from '../../middleware/winston'
import Result from "../utils/result"

class UserOperations {
    static async signUpUser(user: signupParams): Promise<controllerResponse> {
        try {
            // Validate email
            if (!this.validateEmail(user.email)) {
                return Result.EmailNotValidError()
            }

            // Check if email exists
            const tempUser = await db.collection('users').findOne({ email: user.email })
            if (tempUser != null) {
                return Result.EmailExistsError()
            }

            user.timestamp = Date()
            await db.collection('users').insertOne(user)
            logger.info('New user created')

            return Result.Success(201, 'User created', user)
        } catch (err) {
            logger.error('Error creating user')
            return Result.DatabaseError()
        }
    }

    private static validateEmail = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email.toLowerCase())
    }
}

export default UserOperations