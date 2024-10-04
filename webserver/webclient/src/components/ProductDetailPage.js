import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import { addItemToAccountCart } from "../api";
import { addItemToCart } from "../store/actions";
import css from "../styles/ProductDetailPage.module.css";

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

function ProductDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState();
  const [mpname, setMpname] = useState();
  const [mprice, setMprice] = useState();
  const [mtext, setMtext] = useState();

  const { id } = useParams();
  const product = useSelector((state) => state.products).filter(
    (product) => product._id === id
  )[0];
  const isLogin = useSelector((state) => state.auth.isLogin);
  const acc_id = useSelector((state) => state.auth.account_id);

  useEffect(() => {
    setModal(document.getElementById("atc_modal"));
    setMpname(document.getElementById("modal_pname"));
    setMprice(document.getElementById("modal_price"));
    setMtext(document.getElementById("modal_text"));
  }, []);

  const handleAddToCart = async (product) => {
    // Goto Login page if not logged in
    if (!isLogin) {
      navigate("/login");
    }
    // Add product to cart
    mtext.textContent = "This product has been added to cart!";
    mpname.textContent = product.productName;
    mprice.textContent = `$ ${product.price.toFixed(2)}`;

    let cartItem = {
      product: {
        _id: product._id,
        quantity: 1,
        price: parseFloat(product.price.toFixed(2)),
      },
    };

    try {
      await addItemToAccountCart(acc_id, cartItem);
      let { description, createdAt, ...cartProdInfo } = product;
      let newItem = {
        ...cartProdInfo,
        quantity: cartItem.product.quantity,
      };
      // console.log(newItem);
      dispatch(addItemToCart(newItem));
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Product Detail</title>
      </Helmet>
      <div className={css.wrapper}>
        {/* <!-- The Popup Modal --> */}
        <div id="atc_modal" className={css.atc_modal}>
          {/* <!-- Modal content --> */}
          <div className={css.atc_modal_content_area}>
            <span
              className={css.modal_close}
              onClick={() => (modal.style.display = "none")}
            >
              &times;
            </span>
            <div className={css.atc_modal_content}>
              <p id="modal_text" className={css.modal_text}>
                Placeholder
              </p>
              <p id="modal_pname" className={css.modal_pname}>
                Placeholder
              </p>
              <p id="modal_price" className={css.modal_price}>
                Placeholder
              </p>
              <button
                className={css.modal_close_btn}
                onClick={() => (modal.style.display = "none")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <MainHeader></MainHeader>
        <div className={css.container}>
          <div className={css.product_detail}>
            <div className={css.product_image}>
              <img
                src={
                  product.imgUrl
                    ? product.imgUrl
                    : "https://www.claudeusercontent.com/api/placeholder/400/400"
                }
                alt={product.productName}
              />
            </div>
            <div className={css.product_info}>
              <h1 className={css.product_name}>{product.productName}</h1>
              <p className={css.product_price}>$ {product.price}</p>
              <div className={css.product_description}>
                <p>{product.description}</p>
              </div>
              <div className={css.product_actions}>
                <button
                  className={css.add_to_cart_btn}
                  onClick={() => {
                    handleAddToCart(product);
                    modal.style.display = "flex";
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className={css.edit_product_btn}
                  onClick={() => navigate(`/product/edit/${product._id}`)}
                >
                  Edit Product
                </button>
                <button
                  className={css.delete_product_btn}
                  onClick={() => navigate(`/product/delete/${product._id}`)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
