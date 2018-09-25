const { Project, Section } = require('../models');

module.exports = {
  async show(req, res) {
    try {
      const { projectId, sectionId } = req.params;

      const section = await Section.findById(sectionId);
      const project = await Project.findById(projectId);

      const { name } = req.session.user;

      const sections = await Section.findAll({ where: { ProjectId: projectId } });

      return res.render('project', {
        project,
        name,
        sections,
        section,
      });
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
  async add(req, res) {
    try {
      const { projectId } = req.params;
      const { title, content } = req.body;

      const { name } = req.session.user;

      const section = await Section.create({
        ProjectId: projectId,
        title,
        content,
      });
      const project = await Project.findById(projectId);
      const sections = await Section.findAll({ where: { ProjectId: projectId } });

      req.flash('success', 'Seção criada com sucesso!');

      return res.render('project', {
        project,
        name,
        sections,
        section,
      });
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
  async remove(req, res) {
    try {
      const { sectionId, projectId } = req.params;

      await Section.destroy({ where: { id: sectionId } });

      const { name } = req.session.user;
      const project = await Project.findById(projectId);
      const sections = await Section.findAll({ where: { ProjectId: projectId } });

      req.flash('success', 'A seção foi deletada');

      return res.render('project', { project, name, sections });
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
};
