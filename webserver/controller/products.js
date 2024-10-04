const service = require("../services/products");

const { body, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "add-product":
    case "put-product": {
      return [
        body("productName", "Product Name doesn't exists").exists(),
        body("description", "Description doesn't exists").exists(),
        body("price", "Price doesn't exists").exists(),
      ];
    }
  }
};

const getProducts = async (req, res, next) => {
  try {
    res.send(await service.getProducts());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await _getProductById(req.params.id);

    if (product === undefined || product === null) {
      return res.status(404).send({ error: "Product not found" });
    }

    // res.json({ data: product });
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const _getProductById = async (id) => {
  return await service.getProductById(id);
};

const createProduct = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const product = await service.getProductByName(req.body.productName);

    if (product) {
      res.status(499).send({ error: "Product already exist" });
    } else {
      // console.log(product);
      res.send(await service.createProduct(req.body));
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const product = await service.getProductById(req.params.id);

    if (product === undefined || product === null) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.send(await service.updateProduct(req.params.id, req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await service.getProductById(req.params.id);
    // console.log("controller/deleteProduct:", product);

    if (product === undefined || product === null) {
      return res.status(404).send({ error: "Product not found" });
    }
    // res.json({ data: product });
    res.send(await service.deleteProduct(req.params.id));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  validate,
  getProducts,
  getProductById,
  _getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
