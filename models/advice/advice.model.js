const db = require('../database')

const Advice = function createAdvice(advice) {
  this.comment = advice.comment;
  this.rate = advice.rate;
  this.person = advice.person;
  this.product_id = advice.product_id;
}

Advice.create = (Advice, result) => {
  db.query('INSERT INTO advice SET ?', [Advice], (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...Advice });
  });
};

Advice.findByProduct = (productId, result) => {
  db.query(`SELECT * from advice where product_id = ?`, [productId], (err, dbResult) => {
    if (err) {
      return result(error, null);
    }
    if (dbResult.length) {
      return result(null, dbResult);
    }

    return result({ kind: 'not_found' }, null);
  });
};


module.exports = Advice