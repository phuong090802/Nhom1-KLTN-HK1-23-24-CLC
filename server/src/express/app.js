import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { apiCorsOptions } from '../config/cors.js';
import handleError from './middlewares/error.js';
import auth from './routes/auth.js';
import admin from './routes/based-roles/admin.js';
import counsellor from './routes/based-roles/counsellor.js';
import departmentHead from './routes/based-roles/department-head.js';
import userRoleBased from './routes/based-roles/user.js';
import conversation from './routes/based-schemas/conversation.js';
import department from './routes/based-schemas/department.js';
import faq from './routes/based-schemas/faq.js';
import news from './routes/based-schemas/news.js';
import question from './routes/based-schemas/question.js';
import basedUserSchema from './routes/based-schemas/user.js';
import adminStatistic from './routes/statistics/based-roles/admin.js';
import counsellorStatistic from './routes/statistics/based-roles/counsellor.js';
import departmentHeadStatistic from './routes/statistics/based-roles/department-head.js';
import statistic from './routes/statistics/index.js';
import questionRouteForMobile from './routes/based-schemas/mobile/question.js';

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
        `${tokens['response-time'](req, res)}ms`,
      ].join(' - ');
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/department-head', departmentHead);
app.use('/api/counsellor', counsellor);
app.use('/api/user', userRoleBased);
app.use('/api/users', basedUserSchema);
app.use('/api/departments', department);
app.use('/api/questions', question);
app.use('/api/conversations', conversation);
app.use('/api/faqs', faq);
app.use('/api/news', news);
app.use('/api/admin/statistics', adminStatistic);
app.use('/api/counsellor/statistics', counsellorStatistic);
app.use('/api/department-head/statistics', departmentHeadStatistic);
app.use('/api/statistics', statistic);
app.use('/api/mobile/questions', questionRouteForMobile);

app.use(handleError);

export default app;
