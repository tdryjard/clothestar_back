const db = require('../database')

const Product = function createUser(user) {
  this.title = user.title;
  this.description = user.description;
  this.promo_price = user.promo_price;
  this.price = user.price;
  this.image_id = user.image_id;
  this.image_id_2 = user.image_id_2;
  this.image_id_3 = user.image_id_3;
  this.date_delivery = user.date_delivery;
  this.dress_id = user.dress_id;
  this.size1 = user.size1;
  this.size2 = user.size2;
  this.size3 = user.size3;
  this.size4 = user.size4;
  this.size5 = user.size5;
  this.size6 = user.size6;
  this.size7 = user.size7;
  this.size8 = user.size8;
}

Product.create = (Product, result) => {
  db.query('INSERT INTO product SET ?', [Product], (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...Product });
  });
};

Product.find = (result) => {
  db.query(`SELECT product.id, product.title, product.description, product.price, product.promo_price, product.date_delivery,
            product.size1, product.size2, product.size3, product.size4, product.size6, product.size7, product.size8,
            img1.base as base1, img2.base as base2, img3.base as base3,
            product.image_id,
            product.image_id_2, 
            product.image_id_3
            FROM product
            LEFT JOIN image as img1 ON product.image_id = img1.id
            LEFT JOIN image as img2 ON product.image_id_2 = img2.id
            LEFT JOIN image as img3 ON product.image_id_3 = img3.id`, (err, dbResult) => {
    if (err) {
      return result(error, null);
    }
    if (dbResult.length) {
      return result(null, dbResult);
    }

    return result({ kind: 'not_found' }, null);
  });
};

Product.delete = (productId, result) => {
  db.query(`DELETE FROM product WHERE id = ?`, [productId], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }

    return result({type: 'success'}, null);
  });
};

Product.update = (id, product, result) => {
  db.query('UPDATE product SET ? WHERE id = ?', [product, id], (error, response) => {
    if (error) {
      return result(error, null);
    }

    if (response.affectedRows === 0) {
      return result({ kind: 'not_found' }, null);
    }

    return result(null, { id: Number(id), ...product });
  });
};


module.exports = Product