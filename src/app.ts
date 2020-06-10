import express from 'express'
import bodyParser from 'body-parser'

import userRoutes from './modules/user/routes'

// import logger from './middleware/winston'

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