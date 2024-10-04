import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import { addItemToAccountCart } from "../api";
import { addItemToCart, fetchItemsInCartByAccountId } from "../store/actions";
import css from "../styles/ProductListPage.module.css";

/*
state = [
  productItem, productItem, ...
]
productItem = {
  _id: String,
  productName: String,
  description: String,
  price: Number,
  imageurl: String,
  createdAt: String,
}
*/

/*
item_to_cart = {
  _id: String,
  accountId: String,
  product: Object { id: String, quantity: Number, price: Number },
  status: String,
  createdAt: String,
}
*/

const ProductItem = ({ idx, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState();
  const [mpname, setMpname] = useState();
  const [mprice, setMprice] = useState();
  const [mtext, setMtext] = useState();
  // console.log(idx, product);

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
    <div className={css.product_item}>
      <Link to={`/product/${product._id}`}>
        <img
          src={
            product.imgUrl
              ? product.imgUrl
              : "https://www.claudeusercontent.com/api/placeholder/200/200"
          }
          alt={product.productName}
          className={css.product_image}
        />
      </Link>
      <h2 className={css.product_name} title={product.productName}>
        {product.productName}
      </h2>
      <p className={css.product_price}>$ {product.price.toFixed(2)}</p>
      <div className={css.product_actions}>
        <button
          id={`atc_btn_${product._id}`}
          className={css.atc_btn}
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
          Edit
        </button>
        <button
          className={css.delete_product_btn}
          onClick={() => navigate(`/product/delete/${product._id}`)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

function ProductListPage() {
  const dispatch = useDispatch();
  const initialized = useRef(false);
  const [modal, setModal] = useState();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const acc_id = useSelector((state) => state.auth.account_id);
  const allProducts = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // console.log("ProductListPage useEffect");
    setModal(document.getElementById("atc_modal"));
    if (isLogin && !initialized.current && cartItems.length === 0) {
      initialized.current = true;
      dispatch(fetchItemsInCartByAccountId(acc_id));
    }

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }, [isLogin, acc_id, modal, dispatch, cartItems.length]);

  return (
    <>
      <Helmet>
        <title>Products</title>
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
          <section className={css.title_section}>
            <h1>Product List</h1>
            <Link to={"/product/add"}>Add a new product</Link>
          </section>
          <div className={css.product_list}>
            {allProducts.length > 0 ? (
              allProducts.map((product, index) => {
                // console.log(index)
                return (
                  <ProductItem key={index} idx={index} product={product} />
                );
              })
            ) : (
              <>
                <p>There is currently no Product to show.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListPage;
