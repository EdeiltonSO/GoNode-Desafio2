module.exports = (req, res, next) => {
  if (req.session.user) {
    console.log('VOCÊ JÁ ESTÁ LOGADO!');
    return res.redirect('/app/dashboard');
  }
  return next();
};
