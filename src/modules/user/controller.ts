import { userParams, controllerResponse, signinParams } from "./interface"
import { db } from '../database/mongodb'
import logger from '../../middleware/winston'
import Result from "../utils/result"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {ObjectID} from "mongodb"
import sgMail from '@sendgrid/mail'

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

            // Sending verification email
            const emailToken = jwt.sign({ userID: user._id }, process.env.EMAIL_JWT_SECRET as string)
            const url = `http://localhost:3000/verify/${emailToken}`
            sgMail.setApiKey(process.env.SG_KEY as string)
            const msg = {
                to: user.email,
                from: 'rithik.jain3006@gmail.com',
                subject: 'Confirm Email',
                html: `Please click on the following link to confirm your email: <a href="${url}">${url}</a>`,
            }
            try {
                sgMail.send(msg)
            } catch (err) {
                logger.error(err)
            }

            return Result.Success(201, 'User created', 'Verification email sent')

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