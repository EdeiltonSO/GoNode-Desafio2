const express = require('express');

const routes = express.Router();

const logController = require('./controllers/logController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

const authMiddle = require('./middlewares/auth');
const guestMiddle = require('./middlewares/guest');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.use('/app', authMiddle);

// ÁREA EXTERNA ///////////////////////////
routes.get('/', guestMiddle, logController.signin);
routes.get('/signup', guestMiddle, logController.signup);
routes.get('/signout', logController.signout);

routes.post('/register', logController.register);
routes.post('/authenticate', logController.authenticate);

// ÁREA INTERNA ///////////////////////////
// Dashboard
routes.get('/app/dashboard', dashboardController.index);

// Project
routes.post('/projects/add', projectController.add);
routes.get('/projects/get/:projectId', projectController.show);
routes.get('/projects/del/:projectId', projectController.remove);

// Section
routes.post('/sections/:projectId/add', sectionController.add);
routes.get('/sections/:projectId/get/:sectionId', sectionController.show);
routes.get('/sections/:projectId/del/:sectionId', sectionController.remove);

// ERROR 404
routes.use((req, res) => {
  console.log('>>> ERROR 404');
  res.render('error404');
});

module.exports = routes;
