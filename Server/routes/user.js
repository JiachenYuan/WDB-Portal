const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const axios = require("axios");

const router = express.Router();



const User = require("../model/User.js");

router.post("/signup", [
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(), 
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {username} = req.body;

    const hwList = new Array(12);
    for (let i=0; i<12; i++) {
      hwList[i] = {link: "null", grade: "ungraded"};
    }

    try {
        let user = await User.findOne({
            username: username
        })

        if (user) { // The make it an "early return statement", using user/login 's response as this request's response
            const temp = await axios.post("http://localhost:4000/user/login", {username: username}); 
            return res.status(200).json(temp.data);        
            console.log("Anything should not be printed")
            
            
            // return res.status(400).json({
            //     msg: "User Already Exists"  
            // });
        }

        user = new User({
            username: username, 
            homeworklist: hwList
        });

        // Encrypting the password using bcryptjs
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(user.password, salt);

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
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const {username} = req.body;
      try {
        let user = await User.findOne({
          username: username
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch)
        //   return res.status(400).json({
        //     message: "Incorrect Password !"
        //   });
  
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
