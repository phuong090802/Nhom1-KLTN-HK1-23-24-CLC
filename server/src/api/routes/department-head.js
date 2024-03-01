import express from 'express';

import authHandler from '../middlewares/auth.js';
import { addFieldHandler } from '../controllers/department-head.js';
import { validateDepartmentOfDepartmentHead } from '../middlewares/validate.js';

const router = express.Router();

router.use(authHandler('DEPARTMENT_HEAD'));

router.route('/').post(validateDepartmentOfDepartmentHead, addFieldHandler);

export default router;
