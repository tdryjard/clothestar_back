const db = require('../database')

const Dress = function createUser(user) {
  this.star_id = user.star_id;
  this.image_id = user.image_id;
}

Dress.create = (Dress, result) => {
  db.query('INSERT INTO dress SET ?', [Dress], (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...Dress });
  });
};

Dress.find = (result) => {
  db.query(`SELECT dress.id, dress.star_id, img1.base as base1, star_name.name as name, dress.image_id
  FROM dress
  LEFT JOIN image as img1 ON dress.image_id = img1.id
  LEFT JOIN star as star_name ON dress.star_id = star_name.id`, (err, dbResult) => {
    if (err) {
      return result(error, null);
    }
    if (dbResult.length) {
      return result(null, dbResult);
    }

    return result({ kind: 'not_found' }, null);
  });
};

Dress.findProductDress = async (dress, result) => {
  try{
    db.query(`SELECT product.id, product.title, product.description, product.price, product.promo_price, product.date_delivery,
              img1.base as base1, img2.base as base2, img3.base as base3,
              product.image_id,
              product.image_id_2, 
              product.image_id_3
              FROM product
              LEFT JOIN image as img1 ON product.image_id = img1.id
              LEFT JOIN image as img2 ON product.image_id_2 = img2.id
              LEFT JOIN image as img3 ON product.image_id_3 = img3.id
              WHERE dress_id = ${dress.id}`, (err, product) => {
    if (err) {
      return result(error, null);
    }
    else {
      const newDress = {...dress, product : product}
      return result(null, newDress);
    }
  })
} catch {
    return result({ kind: 'not_found' }, null);
  }

  }

Dress.delete = (dressId, result) => {
  db.query(`DELETE FROM dress WHERE id = ?`, [dressId], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }

    return result({type: 'success'}, null);
  });
};

Dress.update = (id, dress, result) => {
  db.query('UPDATE dress SET ? WHERE id = ?', [dress, id], (error, response) => {
    if (error) {
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { id: Number(id), ...product });
  });
};


module.exports = Dress