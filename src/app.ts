import express, { Application } from 'express';
import { routes } from './routes';
const bodyParser = require('body-parser');

// Boot express
export const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Application routing
routes(app);
