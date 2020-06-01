import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/core/Home";
import Signup from "./Components/user/Signup";
import Signin from "./Components/user/Signin";
import AdminRoute from "./Components/auth/helper/AdminRoute";
import PrivateRoute from "./Components/auth/helper/PrivateRoute";
import UserDashBoard from "./Components/user/UserDashBoard";
import AdminDashBoard from "./Components/user/AdminDashBoard";
import AddCategory from "./Components/admin/AddCategory";
import ManageCategories from "./Components/admin/ManageCategory";
import AddProduct from "./Components/admin/AddProduct";
import ManageProducts from "./Components/admin/ManageProducts";
import UpdateProduct from "./Components/admin/UpdateProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/manage/category"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/manage/products"
          exact
          component={ManageProducts}
        />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
