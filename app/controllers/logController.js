const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('signin');
  },
  signup(req, res) {
    return res.render('signup');
  },
  signout(req, res) {
    req.session.destroy(() => res.redirect('/'));
  },
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        req.flash('error', 'Preencha todos os campos!');
        return req.session.save(() => res.redirect('/signup'));
      }

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'O usuário informado já existe!');
        return req.session.save(() => res.redirect('/'));
      }

      const passwordEncrypted = await bcrypt.hash(password, 5);
      await User.create({ ...req.body, password: passwordEncrypted });

      req.flash('success', 'Conta criada com sucesso! Faça o login');
      return req.session.save(() => res.redirect('/'));
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        req.flash('error', 'Preencha todos os campos!');
        return req.session.save(() => res.redirect('/'));
      }

      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Dados incorretos!');
        return req.session.save(() => res.redirect('/'));
      }

      req.session.user = user;
      return req.session.save(() => res.redirect('/app/dashboard'));
    } catch (error) {
      console.log(`>>> ERRO: ${error}`);
      return res.render('error');
    }
  },
};
