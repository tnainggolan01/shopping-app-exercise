import { getProducts } from "../../api";

const response = await getProducts();
const initialState = Object.freeze(response.data);

// const initialState = Object.freeze([]);

/*
state = [
  productItem, productItem, ...
]
productItem = {
  _id: String,
  firstname: String,
  lastname: String,
  email: String,
  createdAt: String,
}
*/

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_PRODUCT_ITEM": {
      return state.concat(payload);
    }
    case "REMOVE_PRODUCT_ITEM": {
      return state.filter((product) => product._id !== payload._id);
    }
    case "UPDATE_PRODUCT_ITEM": {
      return state.map((product) => {
        if (product._id !== payload._id) {
          return product;
        }
        return {
          ...product,
          ...payload,
        };
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
