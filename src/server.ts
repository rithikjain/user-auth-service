import http from 'http'
import app from './app'
import logger from './middleware/winston'

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, () => {
	logger.info('Server listening...')
})