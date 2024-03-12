import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { apiCorsOptions } from '../configs/cors.js';

import auth from './routes/auth.js';
import test from './routes/test.js';

import admin from './routes/based-roles/admin.js';
import userRoleBased from './routes/based-roles/user.js';
import departmentHead from './routes/based-roles/department-head.js';
import counsellor from './routes/based-roles/counsellor.js';

import question from './routes/based-schemas/question.js';
import basedUserSchema from './routes/based-schemas/user.js';
import departments from './routes/based-schemas/department.js';

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
app.use('/api/users', basedUserSchema);
app.use('/api/user', userRoleBased);
app.use('/api/departments', departments);
app.use('/api/questions', question);

app.use(errorHandler);

export default app;
