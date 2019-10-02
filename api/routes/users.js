const express = require('express');
const mw = require('../middleware/middleware');

const Users = require('../models/user-model');

const router = express();

router.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

router.post('/users', mw.checkInfo, (req, res) => {
  Users.add(req.body)
        .then(user => {
          if(user) {
            res.status(200).json(user);
          } else {
            res.status(400).json({ error: 'there was a problem adding user to database' });
          };
        })
        .catch(err => {
          res.status(500).json(err);
        });
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  Users.remove(id)
        .then( count => {
          if(count) {
            res.status(204).end();
          } else {
            res.status(500).json({ error: 'something went wrong' });
          }
        });
})

module.exports = router;