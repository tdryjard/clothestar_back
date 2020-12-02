const Advice = require('../../models/advice/advice.model')
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie');
const { request } = require('express');

exports.create = (request, response) => {

    const {
        comment,
        rate,
        person,
        product_id
    } = request.body;

    // Creer un utilisateur
    const advice = new Advice({
        comment: comment || null,
        rate: rate || null,
        person: person || null,
        product_id: product_id || null,
    });

    if (!request.body) {
        return response.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    return Advice.create(advice, (error, data) => {
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

exports.findByProduct = (request, response) => {
    Advice.findByProduct(request.params.id, (error, dbResult) => {
        if (error !== null) {
            if (error.kind === 'not_found') {
                return response.status(404).send({
                    message: `Not found advice with id ${request.param.id}.`
                });
            }
            return response.status(500).send({
                message: `Error retrieving advice with id ${request.param.id}`
            });
        }

        // Envoi de la réponse
        return response.status(200).send(dbResult);
    });
};