import app from '../app';
import logger from '../lib/logger';

const port = process.env.PORT;

async function createServer() {
	/**
	 * Additional services which requires initializations as async operations
	 * e. g.
	 * await sequelize.authenticate();
	 */
	const server = app.listen(port)
		.on('error', (error) => {
			setImmediate(() => {
				logger.error(error);
				process.exit(-1);
			});
		})
		.on('listening', () => {
			const addr = server.address();
			if (addr === null)
				logger.warn('The server has not started yet or has been closed!');
			else if (typeof addr === 'string')
				logger.info(`The server is listening to pipe ${addr}!`);
			else
				logger.info(`The server is listening to port ${addr.port}!`);
		});
}

createServer();
