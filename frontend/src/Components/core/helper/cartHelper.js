export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    item.photo = undefined;
    cart.push({
      ...item,
      count: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    for (var i in cart) {
      if (cart[i]._id === productId) {
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
      }
    }
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    var cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
