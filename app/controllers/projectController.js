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
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
  async add(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        req.flash('error', 'Qual o nome do projeto?');
        return req.session.save(() => res.redirect('/app/dashboard'));
      }

      const project = await Project.create({
        title: name,
        UserId: req.session.user.id,
      });
      req.flash('success', 'O projeto foi criado com sucesso!');
      return req.session.save(() => res.redirect(`/app/projects/${project.id}/get`));
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
  async remove(req, res) {
    try {
      await Project.destroy({ where: { id: req.params.projectId } });
      req.flash('success', 'O projeto foi deletado com sucesso!');

      return req.session.save(() => res.redirect('/app/dashboard'));
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
};
