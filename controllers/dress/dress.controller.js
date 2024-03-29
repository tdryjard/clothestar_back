const Dress = require('../../models/dress/dress.model')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie');
const { request } = require('express');

exports.create = (request, response) => {

    const {
        star_id,
        image_id,
    } = request.body;

    // Creer un utilisateur
    const dress = new Dress({
        star_id: star_id || null,
        image_id: image_id || null,
    });

    if (!request.body) {
        return response.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    return Dress.create(dress, (error, data) => {
        console.log(error)
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
    Dress.find((error, dbResult) => {
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

exports.findProductDress = (request, response) => {
    Dress.findProductDress(request.body.dress, (error, dbResult) => {
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
    Dress.delete(request.params.productId, (err, result) => {
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

    return Dress.update(request.params.id, request.body, (error, data) => {
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