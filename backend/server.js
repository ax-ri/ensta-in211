import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import moviesRouter from './routes/movies.js';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';
import * as path from 'node:path';
import * as auth from './routes/auth.js';
import * as session from './services/session.js';

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    const port = parseInt(process.env.PORT || '8080');

    app.use(logger('dev'));
    app.use(
      cors({
        credentials: true,
        origin: process.env.HOST,
      }),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Setup authentication and session
    session.main(app);
    auth.main(app);
    app.use('/auth', auth.router);

    const apiRouter = express.Router();

    // Register API routes
    apiRouter.get('/', (req, res) => {
      res.send('Hello from Express!');
    });
    apiRouter.use('/users', usersRouter);
    apiRouter.use('/movies', moviesRouter);

    // Register API router
    app.use('/api', apiRouter);

    // Register frontend
    const publicPath = new URL('./public', import.meta.url).pathname;
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });

    // Register 404 middleware and error handler
    app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
    app.use(jsonErrorHandler); // this error handler must be registered after all middleware to catch all errors

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
