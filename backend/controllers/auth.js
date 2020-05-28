const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
exports.signup = (req, res) => {
  // console.log(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    } else {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "USER email does not exist",
      });
    } else {
      if (user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match.",
        });
      } else {
        // Create Token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        // Send Token to user in cookie
        res.cookie("token", token, { expire: new Date() + 100 });
        // send Responce to front end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
      }
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "User Signout success",
  });
};

// Protected Routes

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS Denied user not authenticated",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
         return res.status(403).json({
             error : "You Are not ADMIN, Access Denied!!"
         });
    }
  next();
};
