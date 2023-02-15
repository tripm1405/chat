import express from 'express';

import controller from '../controllers/site.controller.js';

const router = express.Router();

router.post('/sign-up', controller.signUpHandle);
router.post('/sign-in', controller.signInHandle);
router.delete('/sign-out', controller.signOutHandle);
router.post('/refresh-token', controller.refreshTokenHandle);

export default router;