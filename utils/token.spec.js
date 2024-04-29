// teste para o generateUserToken

const { describe, it, expect, jest } = require('@jest/globals');
const { generateUserToken } = require('./token');
const jwt = require('jsonwebtoken');

describe('token', () => {
  // teste declarado com a função it(descrição do caso de teste, callback())
  it('should generate token for logged user', () => {
    // 1 - operação desejada
    const mockUser = {
      name: 'Douglas Junior',
      email: 'douglas@gmail.com',
    };

    const token = generateUserToken(mockUser);

    // 2 - verifica se o resultado obtido é o esperado
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should verify if jwt.sign was called when the token is generated', () => {
    // cria um spy
    const spyJwtSign = jest.spyOn(jwt, 'sign');

    // cria o user e o token
    const mockUser = {
      name: 'Douglas Junior',
      email: 'douglas@gmail.com',
    };
    const token = generateUserToken(mockUser);

    // verifica se o spy foi chamado com os parâmetros necessários
    expect(spyJwtSign).toHaveBeenCalledTimes(1);
    expect(spyJwtSign).toHaveBeenCalledWith(mockUser, process.env.JWT_TOKEN, {
      expiresIn: '7d',
    });

    // destrói o spy - deve ser feito pois se não esse teste pode refletir no próximo
    spyJwtSign.mockRestore();
  });

  it('should return a valid json web token', () => {
    const mockUser = {
      name: 'Douglas Junior',
      email: 'douglas@gmail.com',
    };
    const token = generateUserToken(mockUser);

    // testa se o jwt passa na verificação
    const payload = jwt.verify(token, process.env.JWT_TOKEN);

    // testa se o payload retornado é o que foi enviado no user
    expect(payload).toEqual({
      ...mockUser,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});
