import cors from 'cors';
import express from 'express';
import { access, constants } from 'fs/promises';
import path from 'path';

import apiRouter from '#api/apiRouter.js';
import { corsOptions, ENV_SERVER } from '#config/globals.js';
import errorHandler from '#middlewares/errorHandler.js';
import { ERROR_MESSAGES, STATUS } from '#utils/http.js';
import { sendResponse } from '#utils/response.js';

// https://nodejs.org/api/fs.html#fspromisesaccesspath-mode
await access(
	path.join(ENV_SERVER.DIRNAME, 'package.json'),
	constants.F_OK
).catch(() => {
	console.error(
		'El servidor express debe de ejecutarse desde su carpeta raiz, verifique directorio y/o package.json'
	);
	process.exit(1);
});

// setup
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');

// public/
app.use('/', express.static(path.join(ENV_SERVER.DIRNAME, 'public'))); // solo localhost, Vercel ignora static serve

// api
app.use('/api', apiRouter);
app.use('/api', (_req, res, _next) => {
	sendResponse(
		res,
		{ success: false, status: STATUS.NOT_FOUND },
		ERROR_MESSAGES.NOT_FOUND
	);
});

// health
app.use('/health', (_req, res) =>
	sendResponse(res, {
		success: true,
		status: STATUS.SUCCESS,
		data: new Date(),
	})
);

// 404s + error handler
app.use('/', (_req, res) => res.redirect('/404.html'));
app.use(errorHandler);

app.listen(ENV_SERVER.PORT, () => {
	console.log(`Servidor ejecutandose en http://localhost:${ENV_SERVER.PORT}`);
});
