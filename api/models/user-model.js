const db = require('../config');

module.exports = {
  add,
  find,
  findBy,
  loginFindBy,
  findById,
  remove
};

function find() {
  return db('users');
}

function findBy(filter) {
  return db('users').where(filter);
}

function loginFindBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users').where({id}).first();
};

function add(userCreds) {
  return db('users')
            .insert(userCreds, 'id')
            .then(ids => {
              const [id] = ids;
              return findById(id);
            });
};

function remove(id) {
  return db('users').where({id}).del();
}