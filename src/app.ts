import express from 'express'
import bodyParser from 'body-parser'

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
	res.send("Hello There!!")
})

export default app