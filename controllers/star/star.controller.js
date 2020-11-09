const Star = require('../../models/star/star.model')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie');
const { request } = require('express');

exports.create = (request, response) => {

    const {
        name,
        image_id,
    } = request.body;

    // Creer un utilisateur
    const star = new Star({
        name: name || null,
        image_id: image_id || null,
    });

    if (!request.body) {
        return response.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    return Star.create(star, (error, data) => {
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
    Star.find((error, dbResult) => {
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
    Star.delete(request.params.starId, (err, result) => {
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

    return Star.update(request.params.id, request.body, (error, data) => {
        if (error) {
            if (error.kind === 'not_found') {
                return response.status(404).send({
                    message: `pas trouvé de user. veuillez nous contacter`
                });
            }
            return response.status(500).send({
                message: `Problème connexion à la base de donnée, veuillez nous contacter en cas de problèmes`
            });
        }

        return response.status(200).send(request.body);
    });
};