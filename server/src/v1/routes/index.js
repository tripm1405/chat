import express from 'express';

import siteRoute from './site.route.js';
import messageRoute from './message.route.js';

const router = express.Router();

router.use('/message', messageRoute);
router.use('/', siteRoute);

export default router;