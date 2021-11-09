import bunyan from 'bunyan';
import fs from 'fs';
import path from 'path';

const name = process.env.LOGGER_NAME ?? 'koa';
const location = process.env.LOGGER_PATH ?? 'log';
if (!fs.existsSync(location))
	fs.mkdirSync(location);

const logger = bunyan.createLogger({
	name,
	streams: [{
		level: 'trace',
		stream: process.stdout
	}, {
		level: 'info',
		path: path.join(location, 'info.log')
	}, {
		level: 'error',
		path: path.join(location, 'error.log')
	}]
});

export default logger;
