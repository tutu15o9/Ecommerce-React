import React, { useState, useEffect } from "react";
import "../../styles.css";
// import { API } from "../../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

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
  const loadCheckout = () => {
    return <StripeCheckout products={products} setReload={setReload} />;
  };

  return (
    <Base
      title="Cart Page"
      description="Ready to checkout"
      importCss={products === undefined || products.length === 0 ? true : false}
    >
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
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
