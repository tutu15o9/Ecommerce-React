import React, { useState, useEffect } from "react";
import "../../styles.css";
// import { API } from "../../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products !== undefined &&
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))}
      </div>
    );
  };
  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  return (
    <Base
      title="Cart Page"
      description="Ready to checkout"
      importCss={products === undefined || products.length === 0 ? true : false}
    >
      <div className="row text-center">
        <div className="col-6">
          {products !== undefined && products.length > 0 ? (
            loadAllProducts()
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        {products !== undefined && products.length > 0 ? (
          <div className="col-6">
            <h3 className="text-white"> Checkout</h3>

            <h3>Your bill is Rs.{getAmount()}/- </h3>
            <div className="row tex-center">
              <div className="col-12">
                <Paymentb products={products} setReload={setReload} />
              </div>
            </div>
            <br />
            <br />
            <div className="row tex-center">
              <div className="col-12">
                <StripeCheckout products={products} setReload={setReload} />
              </div>
            </div>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    </Base>
  );
};

export default Cart;

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    next();
  }
};
