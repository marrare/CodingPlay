module.exports = (app) => {
  const HomeController = {
    index: function(req, res) {
      res.render('index');
    }
  };
  return HomeController;
};