const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();


const User = require("../model/User.js");

router.post("/signup", [
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password")
    .isLength({min: 6})    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {username, password} = req.body;
    // TODO: The number of homework need to be serialized instead of hardcoded
    const hwList = new Array(12);
    for (let i=0; i<12; i++) {
      hwList[i] = {link: "null", grade: "ungraded"};
    }

    try {
        let user = await User.findOne({
            username: username
        })

        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"  
            });
        }

        user = new User({
            username: username, 
            password: password,
            homeworklist: hwList
        });

        // Encrypting the password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );


    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }

});


router.post(
    "/login",
    [
    check("username", "Please enter a valid username")
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password").isLength({min: 6})
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { username, password, homeworklist } = req.body;
      try {
        let user = await User.findOne({
          username: username
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );


router.get("/me", auth, async (req, res) => {
    try {
        // req.user is getting fetched from Middleware after token has been verified
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({message: "Error in Fetching user"});
    }
});


module.exports = router;
