import express from 'express'
import bodyParser from 'body-parser'

import logger from './middleware/winston'
import { connectToDB } from './modules/database/mongodb'

// Loading Routes
import userRoutes from './modules/user/routes'

// Connect to DB
connectToDB(() => {
	logger.info("Connected to DB...")
})

const app = express()

// parse valid requests only
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
)
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('Yepp its up...')
})

app.use('/user', userRoutes)

export default app