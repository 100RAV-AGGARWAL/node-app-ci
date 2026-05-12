import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import helmet from 'helmet';
import logger from 'jet-logger';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import EnvVars, { NodeEnvs } from './common/constants/env.js';
import Paths from './common/constants/Paths.js';
import { RouteError } from './common/utils/route-errors.js';
import BaseRouter from './routes/apiRouter.js';
import swaggerSpec from './swagger.js';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.DEV) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.PRODUCTION) {
  app.use(helmet({ contentSecurityPolicy: false }));
}

// Health check
app.get('/', (_: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', docs: '/api-docs' });
});

app.get('/health', (_: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
});

// Swagger docs
app.get('/api-docs.json', (_: Request, res: Response) => {
  return res.status(200).json(swaggerSpec);
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Lilly Scout API Docs',
  }),
);

// Add APIs, must be after middleware
app.use(Paths._, BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (EnvVars.NodeEnv !== NodeEnvs.TEST.valueOf()) {
    logger.err(err, true);
  }
  if (err instanceof RouteError) {
    return res.status(err.status).json({ error: err.message });
  }
  return next(err);
});

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
