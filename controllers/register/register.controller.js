const bcrypt = require('bcrypt');
const User = require('../../models/register/register.model');
const jwt = require('jsonwebtoken');

exports.connect = function userConnectToTheWebsite(request, response) {
  const { pseudo, password } = request.body;

  return User.connect(pseudo, (err, data) => {

    if (err) {
      return response.status(400);
    }

    if (password && data) {
      bcrypt.compare(password, data.password).then(function (result) {
        if (result === true) {
          const token = jwt.sign({ id: data.id, exp: (Date.now() / 1000 + (60 * 60 * 120)) }, `${process.env.SECRET_KEY}`);
          return response.status(200).send({
            text: 'Vous êtes connecté.',
            token,
            alertType: 'success'
          });
        } else return response.status(200).send({
          alertType: 'error login'
        });
      });
    }

    // Génération du jsonWebToken

  })
}