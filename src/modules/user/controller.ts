import { userParams, controllerResponse, signinParams } from "./interface"
import { db } from '../database/mongodb'
import logger from '../../middleware/winston'
import Result from "../utils/result"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {ObjectID} from "mongodb"

class UserOperations {
    static async signUpUser(user: userParams): Promise<controllerResponse> {
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

            // Hashing password
            const passHash = bcrypt.hashSync(user.password, 10)
            user.password = passHash

            user.isVerified = false
            user.timestamp = Date()
            await db.collection('users').insertOne(user)
            logger.info('New user created')

            const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET as string)

            const payload = {user: user, token: token}
            return Result.Success(201, 'User created', payload)

        } catch (err) {
            logger.error('Error creating user')
            return Result.DatabaseError()
        }
    }

    static async signInUser(user: signinParams): Promise<controllerResponse> {
        try {
            // Validate email
            if (!this.validateEmail(user.email)) {
                return Result.EmailNotValidError()
            }

            // Check password
            const tempUser = await db.collection('users').findOne({ email: user.email })
            if (tempUser != null) {
                if (bcrypt.compareSync(user.password, tempUser.password)) {
                    const token = jwt.sign({userID: tempUser._id}, process.env.JWT_SECRET as string)

                    const payload = {user: tempUser, token: token}
                    return Result.Success(200, "User signed in", payload)
                } else {
                    return Result.IncorrectCredentialsError()
                }
            } else {
                return Result.IncorrectCredentialsError()
            }

        } catch (err) {
            logger.error('Error signing in user')
            return Result.DatabaseError()
        }
    }
    

    // Protected request
    static async viewDetails(userID: string): Promise<controllerResponse> {
        try {
            const user = await db.collection('users').findOne({ _id: ObjectID.createFromHexString(userID) })
            return Result.Success(200, "User details fetched", user)

        } catch (err) {
            logger.error('Error signing in user')
            return Result.DatabaseError()
        }
    }

    private static validateEmail = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email.toLowerCase())
    }
}

export default UserOperations