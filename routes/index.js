'use strict'

import { Router } from 'express';

// Import routes
import catRoute from './catfacts.js';

const router = Router({
  caseSensitive: true
})

// Use imported routes in router
router.use('/cat', catRoute);

export default router;