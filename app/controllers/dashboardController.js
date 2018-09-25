const { Project } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const projects = await Project.findAll({
        where: { UserId: req.session.user.id },
      });

      const { name } = req.session.user;

      return res.render('dashboard', { name, projects });
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
};
