const Product = require('../../models/product/product.model')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie');
const { request } = require('express');

exports.create = (request, response) => {

    const {
        title,
        description,
        promo_price,
        price,
        date_delivery,
        image_id,
        image_id_2,
        image_id_3,
        dress_id,
        sizes,
        stock
    } = request.body;

    // Creer un utilisateur
    const product = new Product({
        title: title || null,
        description: description || null,
        promo_price: promo_price || null,
        price: price || null,
        image_id: image_id || null,
        image_id_2: image_id_2 || null,
        image_id_3: image_id_3 || null,
        date_delivery: date_delivery || null,
        dress_id: dress_id || null,
        size1: sizes[0] || null,
        size2: sizes[1] || null,
        size3: sizes[2] || null,
        size4: sizes[3] || null,
        size5: sizes[4] || null,
        size6: sizes[5] || null,
        size7: sizes[6] || null,
        size8: sizes[7] || null,
        stock : stock || null
    });

    if (!request.body) {
        return response.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    return Product.create(product, (error, data) => {
        if (error) {
            return response.status(500).send({
                message:
                    error.message || 'Some error occurred while creating the category.'
            })
        }

        const checkingToken = checkToken(request, response)
        const checkingTokenCookie = checkTokenCookie(response, request)
        if ((checkingToken === false) || checkingTokenCookie === false) {
            return response.status(400).send({
                message: 'error token'
            })
        }

        return response.status(201).send(data);
    })
}

exports.find = (request, response) => {
    Product.find((error, dbResult) => {
        if (error !== null) {
            if (error.kind === 'not_found') {
                return response.status(404).send({
                    message: `Not found image with id ${request.params.id}.`
                });
            }
            return response.status(500).send({
                message: `Error retrieving image with id ${request.params.id}`
            });
        }

        // Envoi de la réponse
        return response.status(200).send(dbResult);
    });
};

exports.delete = (request, response) => {
    Product.delete(request.params.productId, (err, result) => {
        if (err !== null) {
            return response.status(500).send(err);
        }

        const checkingToken = checkToken(request, response)
        const checkingTokenCookie = checkTokenCookie(response, request)
        if ((checkingToken === false) || checkingTokenCookie === false) {
            return response.status(400).send({
                message: 'error token'
            })
        }

        return response.status(200).send({ type: 'success' });
    });
};

exports.update = (request, response) => {
    if (!request.body) {
        response.status(400).send({
            message: 'Content can not be empty!'
        });
    }
        const checkingToken = checkToken(request, response)
        const checkingTokenCookie = checkTokenCookie(response, request)
        if ((checkingToken === false) || checkingTokenCookie === false) {
            return response.status(400).send({
                message: 'error token'
            })
        }

    return Product.update(request.params.id, request.body, (error, data) => {
        if (error) {
            if (error.kind === 'not_found') {
                return response.status(404).send({
                    message: `pas trouvé de user ${contactId}. veuillez nous contacter`
                });
            }
            return response.status(500).send({
                message: `Problème connexion à la base de donnée, veuillez nous contacter en cas de problèmes`
            });
        }

        return response.status(200).send(request.body);
    });
};