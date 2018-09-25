module.exports = (req, res, next) => {
  if (!req.session.user) {
    console.log('FAÇA LOGIN PARA CONTINUAR!');
    res.redirect('/');
  } else {
    next();
  }
};
