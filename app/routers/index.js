const { Router } = require('express');
// const debug = require('debug')('main-router');

const apiRouter = require('./api');
const backofficeRouter = require('./backoffice');
const errorHandler = require('../middlewares/errorHandler');

const router = Router();

router.use('/api', apiRouter);

router.use('/backoffice', backofficeRouter);

// 4 parameters middleware that caches all errors thrown. Without the 4 parameters we won't be able to go inside
router.use((err, _, response, next) => {
    // Error manager that send back a custom error response
    errorHandler(err, response, next);
});

/**
 * Final middleware that catches all wrong routes where there is no errors thrown
 * ExpressMiddleware signature
 * @param {object} _ Express request object (not used)
 * @param {object} res Express response object
 * @returns {string} JSON error response
 */
router.use((_, res) => {
    res.status(404).json({ name: 'General', version: '1.0', status: 404, message: 'not_found' });
});

module.exports = router;
