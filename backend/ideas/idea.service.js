const db = require('_helpers/db');

module.exports = {
    createIdea,
    getAll
};

async function createIdea(params) {
    // save idea
    await db.Idea.create(params);
}

async function getAll() {
    return await db.Idea.findAll();
}