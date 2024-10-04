import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct } from "../api";
import { removeProductItem } from "../store/actions";
import MainHeader from "./MainHeader";
import css from "../styles/ProductDeletePage.module.css";

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

function DeleteProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const isLogin = useSelector((state) => state.auth.isLogin);
  const { id } = useParams();
  const product = useSelector((state) => state.products).find(
    (product) => product._id === id
  );
  // console.log(product._id);

  useEffect(() => {
    // console.log("DeleteProductPage useEffect");
    // Goto Login page if not logged in
    if (!isLogin) {
      navigate("/login");
    }
    if (!product && !isDeleted) {
      navigate("/product");
    }
  }, [isLogin, navigate, product, isDeleted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product) {
      try {
        await deleteProduct(product._id);
        dispatch(removeProductItem(product));
        setIsDeleted(true);
        navigate("/product");
      } catch (error) {
        // console.log(error.response.status);
        // console.log(error.message);
        // console.log(error.response.data.error);
        if (error.response && error.response.status === 404) {
          setErrMessage("Product not found.");
        } else {
          setErrMessage("An error occurred while deleting product.");
        }
      }
    }
  };

  if (!product || isDeleted) {
    return <p>Product not found.</p>;
  } else if (!product && !isDeleted) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>Delete Product</title>
      </Helmet>
      <div className={css.wrapper}>
        <MainHeader></MainHeader>
        <div className={css.container}>
          <h2>Are you sure you want to delete this Product?</h2>
          <div>
            <p className={css.err_text}>{errMessage}</p>
          </div>
          {product && (
            <form action="#" method="post" onSubmit={handleSubmit}>
              <div className={css.form_group}>
                <div className={css.product_item}>
                  <img
                    src={
                      product && product.imgUrl
                        ? product.imgUrl
                        : "https://www.claudeusercontent.com/api/placeholder/500/500"
                    }
                    alt={product.productName}
                    className={css.product_image}
                  />
                  <h2 className={css.product_name}>{product.productName}</h2>
                  <p className={css.product_price}>$ {product.price}</p>
                  <p className={css.product_description}>
                    {product.description}
                  </p>
                </div>
                <div className={css.button_group}>
                  <button
                    className={css.cancel_button}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  >
                    No
                  </button>
                  <button type="submit" className={css.delete_button}>
                    Yes! I want to delete this
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default DeleteProductPage;
