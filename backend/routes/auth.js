const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Admin = require("../models/Admin");
const OTP = require("../models/OTP");
const Comments = require("../models/Comments");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const _ = require("lodash");

const JWT_SECRET = "Amanisgood";

//Route 1: Create a user using: post "/api/auth/create user
router.post(
  "/createuser",
  [
    body("username", "Invalid username").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("phone", "Invalid phone").isNumeric(),
  ],
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/),
  body("cpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  async (req, res) => {
    let success = false;
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether the user with this phone exists or not
    try {
      let user = await User.findOne({ phone: req.body.phone });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry phone number already exists" });
      }

      //using bcrypt in password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const secCpass = await bcrypt.hash(req.body.cpassword, salt);

      //create a new user
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        cpassword: secCpass,
        phone: req.body.phone,
      });

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 2: Authenticate a user using: POST "/api/auth/login".
const twilio = require("twilio");
router.post(
  "/login",
  [
    body("username", "Invalid username"),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Invalid username or password" });
      }

      // // Generate an OTP
      // const otp = Math.floor(100000 + Math.random() * 900000);

      // // Send the OTP via SMS using Twilio
      // const twilioClient = twilio(
      //   "AC2bb70f479f06fd9b090ec31f1d22f41d",
      //   "6fb98c140e31d7bc36280c4fdca7f934"
      // );
      // const message = await twilioClient.messages.create({
      //   body: `Your OTP is ${otp}. Please don't share you otp with anyone.
      //   Your OTP will be valid for 1 minute only.`,
      //   from: "+15855522642",
      //   to: phone,
      // });

      // //Save otp in database
      // user = await OTP.create({
      //   phone: req.body.phone,
      //   OTP: otp,
      // });

      // //delete otp in 1 minutes
      // setTimeout(async () => {
      //   await OTP.deleteOne({ phone: req.body.phone });
      // }, 1 * 60 * 1000);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Check otp  using: POST "/api/auth/otp". No login required
router.post(
  "/otp",
  [body("otp", "OTP is required").exists()],
  async (req, res) => {
    let success = false;
    //If any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { otp } = req.body;
    try {
      const user = await OTP.findOne({ otp });
      if (!user) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      if (!_.isEqual(otp, user.OTP)) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      const datas = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(datas, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 4: Change password  using: PUT "/api/auth/change". Login required
router.put(
  "/change",
  [body("cupassword", "Invalid password").exists()],
  body("newpassword")
    .isLength({ min: 8 })
    .matches(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/),
  body("cpassword").custom((value, { req }) => {
    if (value !== req.body.newpassword) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  async (req, res) => {
    let success = false;
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether the user with this username exists or not
    try {
      const user = await User.findById(req.body.id);
      const isMatch = await bcrypt.compare(req.body.cupassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success, error: "Invalid password" });
      }
      //using bcrypt in password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.newpassword, salt);
      const secCpass = await bcrypt.hash(req.body.cpassword, salt);

      //create a new password
      user = await User.updateMany({
        newpassword: secPass,
        cpassword: secCpass,
      });

      //
      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 5: Add a comment using: POST "/api/auth/addcomment". Login required
router.post(
  "/addcomments",
  [
    body("username"),
    body("description")
      .notEmpty()
      .withMessage("Comment description is required"),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { description } = req.body;
      const username = req.body.username; // Retrieve the username from the authentication token or session

      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Adding a new comment
      const comment = await Comments.create({
        username,
        description,
      });
      const data = { user: { username: username } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      const savedComment = await comment.save();
      res.json(savedComment);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 6: Get all comments using: GET "/api/auth/getcomment"
router.get("/fetchallcomments", async (req, res) => {
  try {
    const comments = await Comments.find();
    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 6.1: Get all user using: GET "/api/auth/getusers"
router.get("/fetchallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 6.1: DELETE comment using: DELETE "/api/auth/deletecomment"
router.delete("/deletecomment/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comments.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


//Route 7: Create a admin using: post "/api/auth/createadmin
router.post(
  "/createadmin",
  [
    body("username", "Invalid username").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("phone", "Invalid phone").isNumeric(),
  ],
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/),
  body("cpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  async (req, res) => {
    let success = false;
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether the user with this phone exists or not
    try {
      let admin = await Admin.findOne({ phone: req.body.phone });
      if (admin) {
        return res
          .status(400)
          .json({ success, error: "Sorry phone number already exists" });
      }

      //using bcrypt in password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const secCpass = await bcrypt.hash(req.body.cpassword, salt);

      //create a new admin
      admin = await Admin.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        cpassword: secCpass,
        phone: req.body.phone,
      });

      const data = { admin: { id: admin.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 8: Authenticate a admin using: POST "/api/auth/adminlogin".
router.post(
  "/adminlogin",
  [
    body("phone", "Invalid phone number"),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;
    try {
      let admin = await Admin.findOne({ phone });
      if (!admin) {
        success = false;
        return res.status(400).json({ error: "Invalid phone or password" });
      }

      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Invalid phone or password" });
      }

      // Generate an OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Send the OTP via SMS using Twilio
      const twilioClient = twilio(
        "AC2bb70f479f06fd9b090ec31f1d22f41d",
        "6fb98c140e31d7bc36280c4fdca7f934"
      );
      const message = await twilioClient.messages.create({
        body: `Your OTP is ${otp}. Please don't share you otp with anyone. 
        Your OTP will be valid for 1 minute only.`,
        from: "+15855522642",
        to: phone,
      });

      //Save otp in database
      user = await OTP.create({
        phone: req.body.phone,
        OTP: otp,
      });

      //delete otp in 1 minutes
      setTimeout(async () => {
        await OTP.deleteOne({ phone: req.body.phone });
      }, 1 * 60 * 1000);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
