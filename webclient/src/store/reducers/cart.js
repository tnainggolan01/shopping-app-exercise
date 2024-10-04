const newCart = {
  items: [],
  totalPrice: 0,
};
const initialState = Object.freeze(newCart);

/*
items = [
  cartItem, cartItem, ...
]
cartItem = {
  _id: String,
  productName: String,
  price: Number,
  quantity: Number,
}
*/

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce(
    (total, cartItem) =>
      parseFloat((total + cartItem.price * cartItem.quantity).toFixed(2)),
    0
  );
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "RESET_CART": {
      return initialState;
    }
    case "REMOVE_CART_ITEM": {
      const items = state.items.filter(
        (cartItem) => cartItem._id !== payload._id
      );
      const totalPrice = calculateTotalPrice(items);
      // console.log("reducer/REMOVE_CART_ITEM:", state, items, totalPrice);
      return { items, totalPrice };
    }
    case "ADD_ITEM_TO_CART": {
      let isExist = false;
      let items = state.items.map((cartItem) => {
        if (cartItem._id !== payload._id) {
          return cartItem;
        }
        // If the item already exists, update the quantity
        isExist = true;
        return {
          ...cartItem,
          ...payload,
          quantity: cartItem.quantity + payload.quantity,
        };
      });

      // If the item does not exist in the cart, add it
      if (!isExist) {
        items.push(payload);
      }
      const totalPrice = calculateTotalPrice(items);
      return { items, totalPrice };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
