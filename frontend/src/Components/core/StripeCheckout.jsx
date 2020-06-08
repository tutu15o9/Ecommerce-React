import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./Cart";
import { loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API, STRIPE_PK } from "../../backend";
import { createOrder } from "./helper/orderHelper";
const uuid = require("uuid/v4");
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setdata] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const Token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const getTotal = () => {
    return (
      products !== undefined &&
      products.reduce(
        (currentValue, nextValue) => currentValue + nextValue.price,
        0
      )
    );
  };
  const makePayment = (token) => {
    const body = {
      token: token,
      products: products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((responce) => {
        console.log(responce);
        const { status } = responce;

        const orderData = {
          products: products,
          transaction_id: uuid(),
          amount: getTotal(),
          user: userId,
        };
        createOrder(userId, isAuthenticated().token, orderData);
        cartEmpty(() => {});
        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={STRIPE_PK}
        token={makePayment}
        amount={getTotal() * 100}
        name="Buy tshirt"
        shippingAddress
        billingAddress
        currency="INR"
      >
        <button className="btn btn-block btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="jumbotron btn btn-warning ">Signin</button>
      </Link>
    );
  };

  return <div>{showStripeButton()}</div>;
};

export default StripeCheckout;
