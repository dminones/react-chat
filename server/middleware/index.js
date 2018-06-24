const bodyParser = require("body-parser");

module.exports = function(app) {
  // parse urlencoded request bodies into req.body
  app.use(bodyParser.urlencoded({ extended: false }));
};
