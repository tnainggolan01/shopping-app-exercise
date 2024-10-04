import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../api";
import { addProductItem } from "../store/actions";
import MainHeader from "./MainHeader";
import css from "../styles/ProductAddPage.module.css";

/*
state = [
  productItem, productItem, ...
]
productItem = {
  _id: String,
  productName: String,
  description: String,
  price: Number String,
  imageurl: String,
  createdAt: String,
}
*/

function ProductAddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    // console.log("ProductAddPage useEffect");
    // Goto Login page if not logged in
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productName && description && price) {
      let product = {
        productName,
        description,
        price,
        imgUrl,
      };

      try {
        const response = await createProduct(product);
        // console.log(response.data);
        product = { ...product, ...response.data };
        dispatch(addProductItem(product));
        navigate("/product");
      } catch (error) {
        // console.log(error.response.status);
        // console.log(error.message);
        // console.log(error.response.data.error);
        if (error.response.status === 499) {
          setErrMessage("Product already exists.");
        } else {
          setErrMessage("An error occurred while adding product.");
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <div className={css.wrapper}>
        <MainHeader></MainHeader>
        <div className={css.container}>
          <h1>Add New Product</h1>
          <div className={css.product_form}>
            <div>
              <p className={css.err_text}>{errMessage}</p>
            </div>
            <form action="#" method="post" onSubmit={handleSubmit}>
              <div className={css.form_group}>
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                />
              </div>
              <div className={css.form_group}>
                <label htmlFor="product_description">Description</label>
                <textarea
                  id="product_description"
                  name="product_description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                ></textarea>
              </div>
              <div className={css.form_group}>
                <label htmlFor="product_price">Price</label>
                <input
                  type="number"
                  id="product_price"
                  name="product_price"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      parseFloat(parseFloat(event.target.value).toFixed(2))
                    )
                  }
                  required
                />
              </div>
              <div className={css.form_group}>
                <label htmlFor="product_image">Image URL</label>
                <input
                  type="url"
                  id="product_image"
                  name="product_image"
                  value={imgUrl}
                  onChange={(event) => setImgUrl(event.target.value)}
                />
              </div>
              <button type="submit" className={css.submit_btn}>
                Add Product
              </button>
              <button
                className={css.cancel_btn}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductAddPage;
