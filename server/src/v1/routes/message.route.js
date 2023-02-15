import express from 'express';

import autho from '../middlewares/autho.middleware.js';
import controller from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send', autho.checkLogin, controller.createHandle);
router.get('/read', autho.checkLogin, controller.readHandle);

export default router;