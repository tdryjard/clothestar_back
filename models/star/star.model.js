const db = require('../database')

const Star = function createUser(star) {
  this.name = star.name;
  this.image_id = star.image_id;
}

Star.create = (Star, result) => {
  db.query('INSERT INTO star SET ?', [Star], (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...Star });
  });
};

Star.find = (result) => {
  db.query(`SELECT star.id, star.name,
            img1.base as base1,
            star.image_id
            FROM star
            LEFT JOIN image as img1 ON star.image_id = img1.id`, (err, dbResult) => {
    if (err) {
      return result(error, null);
    }
    if (dbResult.length) {
      return result(null, dbResult);
    }

    return result({ kind: 'not_found' }, null);
  });
};

Star.delete = (starId, result) => {
  db.query(`DELETE FROM star WHERE id = ?`, [starId], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }

    return result({type: 'success'}, null);
  });
};

Star.update = (id, star, result) => {
  db.query('UPDATE star SET ? WHERE id = ?', [star, id], (error, response) => {
    if (error) {
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { id: Number(id), ...product });
  });
};


module.exports = Star