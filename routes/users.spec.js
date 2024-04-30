const { describe, it, expect, beforeAll } = require('@jest/globals');
const request = require('supertest');

const app = require('../app');
const sequelize = require('../database/sequelize');

// maneira de criar o banco em memória para testes
// executa antes de todos os testes
beforeAll(async () => {
  await sequelize.sync();
});

describe('users', () => {
  describe('POST /users', () => {
    it('should create a new user succesfully', async () => {
      // padrão de projeto builder
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Douglas Junior',
          email: 'douglas@gmail.com',
          password: 'senha123',
        })
        .accept('application/json')
        .expect('Content-Type', 'application/json; charset=utf-8');

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        name: 'Douglas Junior',
        email: 'douglas@gmail.com',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    it('should validate if user name is a string', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 123456,
          email: 'douglas@mail.com',
          password: 'senha123',
        })
        .accept('application/json')
        .expect('Content-Type', 'application/json; charset=utf-8');

      expect(response.statusCode).toBe(412);
      expect(response.body).toEqual([
        {
          location: 'body',
          msg: 'O nome deve ser uma string',
          path: 'name',
          type: 'field',
          value: 123456,
        },
      ]);
    });

    it('should validate if the email is unique', async () => {
      // padrão de projeto 'builder'
      // primeiro request
      await request(app)
        .post('/users')
        .send({
          name: 'Douglas Junior',
          email: 'douglas2@gmail.com',
          password: 'senha123',
        })
        .accept('application/json');

      // segundo request
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Douglas Junior',
          email: 'douglas@gmail.com',
          password: 'senha123',
        })
        .accept('application/json')
        .expect('Content-Type', 'text/html; charset=utf-8');

      expect(response.statusCode).toBe(412);
      expect(response.text).toBe('E-mail já cadastrado!');
    });
  });
});
