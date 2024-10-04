import { getAccountById, getPosts, getActiveCartByAccountId } from "../api";

// Auth related actions

export const login = (payload) => ({
  type: "LOGIN",
  payload,
});

export const logout = (payload) => ({
  type: "LOGOUT",
  payload,
});

export const addAccountDetail = (payload) => ({
  type: "ADD_ACCOUNT_DETAIL",
  payload,
});

export const fetchAccountDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await getAccountById(id);
      dispatch(addAccountDetail(response.data));
    } catch (error) {
      console.error("Error fetching account detail", error);
    }
  };
};

// Post related actions

export const addPostItem = (payload) => ({
  type: "ADD_POST_ITEM",
  payload,
});

export const addPosts = (payload) => ({
  type: "ADD_POSTS",
  payload,
});

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await getPosts();
      dispatch(addPosts(response.data));
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };
};

export const updatePostItem = (payload) => ({
  type: "UPDATE_POST_ITEM",
  payload,
});

export const removePostItem = (payload) => ({
  type: "REMOVE_POST_ITEM",
  payload,
});

export const resetPosts = (payload) => ({
  type: "RESET_POSTS",
  payload,
});

// Product related actions

export const addProductItem = (payload) => ({
  type: "ADD_PRODUCT_ITEM",
  payload,
});

export const updateProductItem = (payload) => ({
  type: "UPDATE_PRODUCT_ITEM",
  payload,
});

export const removeProductItem = (payload) => ({
  type: "REMOVE_PRODUCT_ITEM",
  payload,
});

// Cart related actions

export const addItemToCart = (payload) => ({
  type: "ADD_ITEM_TO_CART",
  payload,
});

export const fetchItemsInCartByAccountId = (id) => {
  return async (dispatch) => {
    try {
      const response = await getActiveCartByAccountId(id);
      let { productList } = response.data;
      productList.forEach((product) => {
        const { description, createdAt, ...cartProdInfo } = product;
        // console.log(cartProdInfo);
        dispatch(addItemToCart(cartProdInfo));
      });
    } catch (error) {
      if (error.status === 404) {
        console.log(error.response.data.error);
      } else {
        console.error("Error fetching cart items", error);
      }
    }
  };
};

export const removeItemInCart = (payload) => ({
  type: "REMOVE_CART_ITEM",
  payload,
});

export const resetCart = (payload) => ({
  type: "RESET_CART",
  payload,
});
