import React from "react";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/reducer";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import FeedPage from "./components/FeedPage";
import ProductAddPage from "./components/ProductAddPage";
import ProductListPage from "./components/ProductListPage";
import ProductEditPage from "./components/ProductEditPage";
import ProductDeletePage from "./components/ProductDeletePage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/add" element={<ProductAddPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product/edit/:id" element={<ProductEditPage />} />
          <Route path="/product/delete/:id" element={<ProductDeletePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
