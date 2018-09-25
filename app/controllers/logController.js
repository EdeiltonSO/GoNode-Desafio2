const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  signin(req, res) {
    console.log('>>> SIGNIN');
    return res.render('signin');
  },
  signup(req, res) {
    return res.render('signup');
  },
  signout(req, res) {
    console.log(req.session.user);
    req.session.destroy(() => {
      res.redirect('/');
    });
  },
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        req.flash('error', 'Preencha todos os campos!');
        res.redirect('/signup');
      } else if (await User.findOne({ where: { email } })) {
        req.flash('error', 'O usuário informado já existe!');
        res.redirect('/');
      } else {
        const passwordEncrypted = await bcrypt.hash(password, 5);

        await User.create({ ...req.body, password: passwordEncrypted });
        req.flash('success', 'Conta criada com sucesso! Faça o login');
        res.redirect('/');
      }
    } catch (error) {
      console.log(`>>> ${error}`);
    }
  },
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      console.log(`>>> DO JEITO QUE VEM: ${email.length} | ${password.length}`);
      if (email || password == null) {
        console.log(`>>> DENTRO DO IF: ${email} | ${password}`);

        req.flash('error', 'Preencha todos os campos!');
      }

      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Dados incorretos!');
        return res.redirect('/');
      }

      req.session.user = user;
      return req.session.save(() => res.redirect('/app/dashboard'));
    } catch (error) {
      return console.log(`>>> ${error}`);
    }
  },
};
