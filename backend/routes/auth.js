const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var JWT = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "falguniym";

//Route1: create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("name").isLength({ min: 3 }).withMessage("Name is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    //  let success = false;
    // if there are errors, return then return 400 bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Validation errors:", errors.array());
      return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with this email exists already

    try {
      // to be in safe frame we are wrapping this in the try catch block
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = JWT.sign(data, JWT_SECRET);
      // console.log(authToken);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message); // sending error message on console
      res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
    }
  }
);
//Route2: Authenticate a user using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, return then return 400 bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ errors: "Please Enter the correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        success = false
        return res
          .status(400)
          .json({ success, errors: "Please Enter the correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = JWT.sign(data, JWT_SECRET);
      success = true;
      // console.log(authToken);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message); // sending error message on console
      res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
    }
  }
);


//Route3: get loggedin user details using: POST "/api/auth/getuser". login required. (we have to send JWT token in the header)

router.post(
  "/getuser", fetchUser,
  async (req, res) => {
    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.error(error.message); // sending error message on console
      res.status(500).send("Internal Server Error"); // sending status code 500 and error message.
    }
  }
);

// authentication related end point we will write here
module.exports = router;
