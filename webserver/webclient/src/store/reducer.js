import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import auth from "./reducers/auth";
import posts from "./reducers/posts";
import products from "./reducers/products";
import cart from "./reducers/cart";

const reducer = combineReducers({
  auth,
  posts,
  products,
  cart,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
