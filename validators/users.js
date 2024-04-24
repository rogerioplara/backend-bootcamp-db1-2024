const { checkSchema } = require("express-validator");

const validateLogin = checkSchema(
  {
    email: {
      isEmail: {
        errorMessage: "O email deve ser um endereço válido",
      },
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
        errorMessage: "O email deve ter no mínimo 1 e no máximo 200 caracteres",
      },
      notEmpty: {
        errorMessage: "O email é requerido",
      },
      optional: false,
    },
    password: {
      isString: {
        errorMessage: "A senha deve ser uma string",
      },
      isLength: {
        options: {
          max: 20,
          min: 8,
        },
        errorMessage: "A senha deve ter no mínimo 8 e no máximo 20 caracteres",
      },
      notEmpty: {
        errorMessage: "A senha é requerida",
      },
      optional: false,
    },
  },
  ["body"]
);

const validateCreateUser = checkSchema(
  {
    name: {
      // rege: permite utilizar uma função para utilizar regex
      isString: {
        errorMessage: "O nome deve ser uma string",
      },
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
        errorMessage: "O nome deve ter no mínimo 1 e no máximo 200 caracteres",
      },
      notEmpty: {
        errorMessage: "O nome é requerido",
      },
      optional: false,
    },
    email: {
      isEmail: {
        errorMessage: "O email deve ser um endereço válido",
      },
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
        errorMessage: "O email deve ter no mínimo 1 e no máximo 200 caracteres",
      },
      notEmpty: {
        errorMessage: "O email é requerido",
      },
      optional: false,
    },
    password: {
      isString: {
        errorMessage: "A senha deve ser uma string",
      },
      isLength: {
        options: {
          max: 20,
          min: 8,
        },
        errorMessage: "A senha deve ter no mínimo 8 e no máximo 20 caracteres",
      },
      notEmpty: {
        errorMessage: "A senha é requerida",
      },
      optional: false,
    },
  },
  ["body"] // indica para o express validator que esses valores devem ser verificados no body, pode ser passado em outros locais também
);

module.exports = {
  validateLogin,
  validateCreateUser,
};
