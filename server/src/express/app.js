import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { apiCorsOptions } from '../configs/cors.js';

import auth from './routes/auth.js';
import test from './routes/test.js';

import admin from './routes/based-roles/admin.js';
import user from './routes/based-roles/user.js';
import departmentHead from './routes/based-roles/department-head.js';
import counsellor from './routes/based-roles/counsellor.js';

import users from './routes/based-schemas/users.js';
import departments from './routes/based-schemas/departments.js';

import errorHandler from './middlewares/error-handler.js';

const app = express();

app.use(cors(apiCorsOptions));

// for DEV mode

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(
    morgan((tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
      ].join(' - ');
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/test', test);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/department-head', departmentHead);
app.use('/api/counsellor', counsellor);
app.use('/api/users', users);
app.use('/api/user', user);
app.use('/api/departments', departments);

app.use(errorHandler);

export default app;
