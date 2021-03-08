const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const ideaService = require('./idea.service');

// routes
router.post('/create', authorize(), createIdeaSchema, createIdea);
router.get('/', authorize(), getAll);

module.exports = router;

function createIdeaSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        author: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function createIdea(req, res, next) {
    ideaService.createIdea(req.body)
        .then(idea => res.json({ message: 'Idea added' }))
        .catch(next);
}

function getAll(req, res, next) {
    ideaService.getAll()
        .then(ideas => res.json(ideas))
        .catch(next);
}