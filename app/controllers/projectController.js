const { Project, Section } = require('../models');

module.exports = {
  async show(req, res) {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);

      const { name } = req.session.user;

      const sections = await Section.findAll({ where: { ProjectId: projectId } });

      return res.render('project', { project, name, sections });
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
  async add(req, res) {
    try {
      const { name } = req.body;
      if (name) {
        const project = await Project.create({
          title: name,
          UserId: req.session.user.id,
        });
        req.flash('success', 'Projeto criado com sucesso!');
        res.redirect(`/projects/get/${project.id}`);
      } else {
        req.flash('error', 'Qual o nome do projeto?');
        res.redirect('/');
      }
    } catch (error) {
      console.log(`>>> ${error}`);
    }
  },
  async remove(req, res) {
    try {
      await Project.destroy({ where: { id: req.params.projectId } });
      req.flash('success', 'Projeto deletado');
      return res.redirect('/app/dashboard');
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
};
