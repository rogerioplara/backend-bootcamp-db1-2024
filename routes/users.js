const express = require("express");
const { ValidationError, Sequelize } = require("sequelize");

const sequelize = require("../database/sequelize");

const { validationResultCheck } = require("../validators");
const { validateCreateUser, validateLogin } = require("../validators/users");
const User = require("../models/User");

const router = express.Router();

function isUniqueEmailError(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find(
    (databaseError) =>
      databaseError.type === "unique violation" &&
      databaseError.path === "users_email_unique"
  );
}

/**
 * Cadastro de usuários
 */
router.post("/", validateCreateUser, async (req, res) => {
  if (validationResultCheck(req, res)) {
    return;
  }

  try {
    const { name, email, password } = req.body;

    let user = await User.create({
      name,
      email,
      password,
    });
    user = await User.findByPk(user.id); // faz a busca para utilizar o filtro e não puxar a senha

    res.status(201).json(user);
  } catch (error) {
    console.warn(error);
    if (isUniqueEmailError(error)) {
      res.status(412).send("E-mail já cadastrado!");
      return;
    }
    res.status(500).send();
  }
});

/**
 * Login de usuários
 */
router.post("/login", validateLogin, async (req, res) => {
  if (validationResultCheck(req, res)) {
    return;
  }

  try {
    const { email, password } = req.body;

    // TODO: implementar aqui
  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
});

module.exports = router;
