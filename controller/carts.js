const service = require("../services/carts");
const productController = require("./products");

const { body, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "add-cart":
    case "put-cart": {
      return [body("product", "Product doesn't exists").exists()];
    }
  }
};

const getActiveCartByAccountId = async (req, res, next) => {
  try {
    const cart = await service.getActiveCartByAccountId(req.params.id);

    if (cart === undefined || cart === null) {
      return res
        .status(404)
        .send({ error: "No active cart found for the account" });
    }

    const { productList, ...others } = cart;
    const prodList = productList.map((product) =>
      productController._getProductById(product._id).then((prodItem) => {
        // console.log(product);
        return { ...prodItem, ...product };
      })
    );
    Promise.all(prodList).then((prodList) => {
      // console.log(prodList);
      const newCart = { ...others, productList: prodList };
      // console.log(newCart);
      res.send(newCart);
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addItemToAccountCart = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    // console.log(req.params, req.body);
    const cart = await service.getActiveCartByAccountId(req.params.id);
    // console.log(cart);

    if (cart) {
      updateAccountCart(req, res, next);
    } else {
      res.send(
        await service.addItemToAccountCart(req.params.id, req.body.product)
      );
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateAccountCart = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const cart = await service.getActiveCartByAccountId(req.params.id);
    // console.log(cart);

    if (cart === undefined || cart === null) {
      return res
        .status(404)
        .send({ error: "No active cart found for the account" });
    }

    const { product, ...cartInfo } = req.body;
    let newCart = { ...cartInfo };
    // console.log(newCart);

    // Handling a request to update the product list of the cart
    if (Object.keys(product).length > 0) {
      let isProductFound = false;
      let productList = cart.productList.map((productItem) => {
        if (productItem._id === product._id) {
          isProductFound = true;
          return {
            ...productItem,
            quantity: productItem.quantity + product.quantity,
          };
        }
        return productItem;
      });
      if (!isProductFound) {
        productList.push(product);
      }
      newCart = { ...newCart, productList };
    }

    // console.log(newCart);
    await service.updateAccountCart(req.params.id, "active", newCart);
    res.send(newCart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteItemInAccountCart = async (req, res, next) => {
  try {
    // console.log(req.params.id, req.params.itemid);
    const cart = await service.getActiveCartByAccountId(req.params.id);
    // console.log("controller/deleteItemInAccountCart:", cart, req.body);

    if (cart === undefined || cart === null) {
      return res
        .status(404)
        .send({ error: "No active cart found for the account" });
    }
    let productList = cart.productList.filter(
      (productItem) => productItem._id !== req.params.itemid
    );
    // res.json({ data: cart });
    const newCart = { ...cart, productList };
    // console.log(newCart);
    res.send(await service.updateAccountCart(req.params.id, "active", newCart));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  validate,
  getActiveCartByAccountId,
  addItemToAccountCart,
  updateAccountCart,
  deleteItemInAccountCart,
};
