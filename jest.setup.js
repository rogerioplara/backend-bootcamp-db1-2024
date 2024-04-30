// arquivo de inicialização das variáveis de ambiente - alterar no jest config setupFiles: ['./jest.setup.js']
const path = require('path');
const dotenv = require('dotenv').config;

dotenv({
  path: path.resolve(__dirname, './dev.env'),
});

process.env.NODE_ENV = 'test'; // forca o env para test

// Desabilita os warnings do sequelize durante a execução dos testes
require('sequelize/lib/utils/logger').logger.warn = () => {};
