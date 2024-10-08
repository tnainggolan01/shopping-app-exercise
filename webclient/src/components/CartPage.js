import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import css from "../styles/CartPage.module.css";
import {
  addItemToCart,
  fetchItemsInCartByAccountId,
  removeItemInCart,
  resetCart,
} from "../store/actions";
import {
  addItemToAccountCart,
  deleteItemInAccountCart,
  updateAccountCart,
} from "../api";

/*
cartItem = {
  _id: String,
  accountId: String,
  productList: Array of { id: String, quantity: Number, price: Number },
  status: String,
  createdAt: String,
}
*/

const CartItem = ({ idx, product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  // console.log(idx, product);

  const acc_id = useSelector((state) => state.auth.account_id);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  let cartItem = {
    product: {
      _id: product._id,
      // quantity: parseFloat(product.quantity),
      // price: parseFloat(product.price),
    },
  };

  const addItem = async (itemQuantity) => {
    try {
      cartItem.product.quantity = itemQuantity;
      cartItem.product.price = parseFloat(product.price.toFixed(2));
      // console.log(acc_id, cartItem);
      await addItemToAccountCart(acc_id, cartItem);
      let { description, createdAt, ...cartProdInfo } = product;
      let newItem = {
        ...cartProdInfo,
        ...cartItem.product,
      };
      // console.log(newItem);
      dispatch(addItemToCart(newItem));
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  const deleteItemRow = async (item) => {
    try {
      // console.log(acc_id, item);
      await deleteItemInAccountCart(acc_id, item._id);
      dispatch(removeItemInCart(item));
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      addItem(-1);
      setQuantity(product.quantity - 1);
    }
  };

  const handleIncreaseQuantity = (product) => {
    addItem(1);
    setQuantity(product.quantity + 1);
  };

  const handleRemoveItemRow = (product) => {
    deleteItemRow(product);
    setQuantity(0);
  };

  const handleUpdateQuantity = (product) => {
    const quantityGap = quantity - product.quantity;
    addItem(quantityGap);
  };

  return (
    <div className={css.cart_item}>
      <img
        src={
          product.imgUrl
            ? product.imgUrl
            : "https://www.claudeusercontent.com/api/placeholder/80/80"
        }
        alt={product.productName}
        className={css.item_image}
      />
      <div className={css.item_details}>
        <div className={css.item_name}>
          <Link to={`/product/${product._id}`}>{product.productName}</Link>
        </div>
        <div className={css.item_price}>$ {product.price}</div>
      </div>
      <div className={css.item_quantity_settings}>
        <div className={css.item_quantity}>
          <button
            className={css.quantity_btn}
            onClick={() => handleDecreaseQuantity(product)}
          >
            -
          </button>
          <input
            type="number"
            className={css.quantity_input}
            value={quantity}
            min="1"
            onChange={(event) => setQuantity(parseInt(event.target.value))}
            onBlur={() => handleUpdateQuantity(product)}
          />
          <button
            className={css.quantity_btn}
            onClick={() => handleIncreaseQuantity(product)}
          >
            +
          </button>
        </div>
        <button
          className={css.remove_btn}
          onClick={() => handleRemoveItemRow(product)}
        >
          Remove
        </button>
      </div>{" "}
    </div>
  );
};

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialized = useRef(false);
  const [modal, setModal] = useState();
  const [mtotitems, setMtotitems] = useState();
  const [mtotprice, setMtotprice] = useState();
  const [mtext, setMtext] = useState();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const acc_id = useSelector((state) => state.auth.account_id);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    // console.log("CartPage useEffect");
    // Goto Login page if not logged in
    if (!isLogin) {
      navigate("/login");
    }
    if (cartItems.length === 0 && !initialized.current) {
      initialized.current = true;
      dispatch(fetchItemsInCartByAccountId(acc_id));
    }

    setModal(document.getElementById("atc_modal"));
    setMtotitems(document.getElementById("modal_totitems"));
    setMtotprice(document.getElementById("modal_totprice"));
    setMtext(document.getElementById("modal_text"));

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }, [isLogin, acc_id, cartItems, modal, navigate, dispatch]);

  const handleCheckout = async () => {
    // console.log("Checkout button clicked");
    // Add product to cart
    mtext.textContent = "Thank you for your purchase!";
    mtotitems.textContent = `Total purchased items: ${cartItems.length}`;
    mtotprice.textContent = `$ ${totalPrice}`;

    // TODO: Implement checkout process
    // TODO: Implement API call to add the purchase information into database. For now, we are just making the cart inactive for the specific account

    let cartItem = {
      product: {},
      status: "inactive",
    };

    try {
      // console.log(acc_id, cartItem);
      await updateAccountCart(acc_id, cartItem);
      dispatch(resetCart());
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cart</title>
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
              <p id="modal_totitems" className={css.modal_totitems}>
                Placeholder
              </p>
              <p id="modal_totprice" className={css.modal_totprice}>
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
          <h1>Shopping Cart</h1>
          {cartItems.length > 0 ? (
            <>
              <div className={css.cart_items}>
                {cartItems.map((product, index) => {
                  // console.log(index)
                  return <CartItem key={index} idx={index} product={product} />;
                })}
              </div>
              <div className={css.cart_summary}>
                <div className={css.cart_total}>
                  Total: $ {totalPrice.toFixed(2)}
                </div>
                <button
                  className={css.checkout_btn}
                  onClick={() => {
                    handleCheckout();
                    modal.style.display = "flex";
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <>
              <p>There is currently no Product in Your Cart.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
