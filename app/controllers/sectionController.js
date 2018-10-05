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
        sectionId,
      });
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
  async add(req, res) {
    try {
      const { projectId } = req.params;
      const { title, content } = req.body;

      const section = await Section.create({
        ProjectId: projectId,
        title,
        content,
      });

      req.flash('success', 'A seção foi criada com sucesso!');
      return req.session.save(() => {
        res.redirect(`/app/projects/${projectId}/sections/${section.id}/get`);
      });
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
  async remove(req, res) {
    try {
      const { sectionId, projectId } = req.params;
      await Section.destroy({ where: { id: sectionId } });

      req.flash('success', 'A seção foi deletada com sucesso!');

      return req.session.save(() => {
        res.redirect(`/app/projects/${projectId}/get`);
      });
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
  async update(req, res) {
    try {
      const { projectId, sectionId } = req.params;
      const section = await Section.findById(sectionId);

      section.update(req.body);

      req.flash('success', 'Seção atualizada com sucesso!');
      return req.session.save(() => {
        res.redirect(`/app/projects/${projectId}/sections/${section.id}/get`);
      });
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
};
