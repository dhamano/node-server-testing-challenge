const request = require('supertest');

const db = require('./config');
const server = require('./server');

describe('users database', () => {
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe('GET /', () => {
    it('returns 200 OK and <h2>5x5</h2>', () => {
      return request(server)
                .get('/')
                .then(res => {
                  expect(res.status).toBe(200);
                })
    });
  });

  describe('POSTs', () => {
    beforeEach( async() => {
      await db('users').truncate();
    });

    it('should return 200 OK', () => {
      return request(server)
              .get('/api')
              .then( res => {
                expect(res.status).toBe(200);
              })
    })

    it('should insert a user', async () => {
      await request(server)
              .post('/api/users')
              .send({
                  username: 'todd',
                  password: 'password'
                });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('should remove user', async () => {
      await request(server)
              .post('/api/users')
              .send({ username: 'todd', password: 'pass' });
      await request(server)
              .post('/api/users')
              .send({ username: 'tori', password: 'pass' });
      await request(server)
              .post('/api/users')
              .send({ username: 'bob', password: 'pass' });
      await request(server)
              .delete('/api/users/1');
      
      const users = await db('users');
      expect(users).toHaveLength(2);
    });
  });
});