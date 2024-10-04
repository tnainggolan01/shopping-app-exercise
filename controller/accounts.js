const service = require("../services/accounts");

const { body, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "add-account":
    case "put-account": {
      return [
        body("firstname", "Firstname doesn't exists").exists(),
        body("lastname", "Lastname doesn't exists").exists(),
        body("email", "Email doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
      ];
    }
    case "login-account": {
      return [
        body("email", "Email doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
      ];
    }
  }
};

const getAccounts = async (req, res, next) => {
  try {
    const accounts = await service.getAccounts();
    res.send(
      accounts.map((account) => {
        const { password, ...others } = account;
        return others;
      })
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAccountById = async (req, res, next) => {
  try {
    const account = await service.getAccountById(req.params.id);

    if (account === undefined || account === null) {
      return res.status(404).send({ error: "Account not found" });
    }

    const { password, ...others } = account;
    // res.json({ data: account });
    res.send(others);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createAccount = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const account = await service.getAccountByEmail(req.body.email);

    if (account) {
      res.status(499).send({ error: "Account already exist" });
    } else {
      // console.log(account);
      const { password, ...others } = await service.createAccount(req.body);
      res.send(others);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const account = await service.getAccountById(req.params.id);

    if (account === undefined || account === null) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.send(await service.updateAccount(req.params.id, req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const account = await service.getAccountById(req.params.id);
    // console.log("controller/deleteAccount:", account);

    if (account === undefined || account === null) {
      return res.status(404).send({ error: "Account not found" });
    }
    // res.json({ data: account });
    res.send(await service.deleteAccount(req.params.id));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const loginAccount = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    const account = await service.loginAccount(req.body);
    // console.log(account);
    if (account.length === 1) {
      const { password, ...others } = account[0];
      res.send(others);
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  validate,
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  loginAccount,
};
