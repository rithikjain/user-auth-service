import { MongoClient, Db } from "mongodb"
import logger from '../../middleware/winston'

const dbUrl: string = process.env.DB_URL as string

let mongodb: Db 

function connectToDB(callback: any) {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            logger.error('Error connecting to DB!')
        }

        const db = client.db('authservice')
        mongodb = db
        callback()
    })
}

export { connectToDB, mongodb as db }
