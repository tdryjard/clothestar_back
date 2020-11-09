const db = require('../database')

const User = function createUser(user) {
  this.pseudo = user.pseudo;
  this.password = user.password;
}

User.connect = function userConnect(pseudo, result) {
  db.query('SELECT * FROM admin WHERE pseudo = ?', [pseudo], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }
    if (!dbResult.length) {
      return result({ status: 400 }, null);
    }
    return result(null, dbResult[0]);
  });
};


module.exports = User