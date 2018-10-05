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
routes.get('/app', dashboardController.index);
routes.get('/app/dashboard', dashboardController.index);

// Project
routes.post('/app/projects/add', projectController.add);
routes.get('/app/projects/:projectId/get', projectController.show);
routes.get('/app/projects/:projectId/del', projectController.remove);

// Section
routes.post('/app/projects/:projectId/sections/add', sectionController.add);
routes.get('/app/projects/:projectId/sections/:sectionId/get', sectionController.show);
routes.get('/app/projects/:projectId/sections/:sectionId/del', sectionController.remove);
routes.post('/app/projects/:projectId/sections/:sectionId/update', sectionController.update);

// ERROR 404
routes.use((req, res) => res.render('error404'));

module.exports = routes;
