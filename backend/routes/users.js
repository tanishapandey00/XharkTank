const express = require("express");
const users = require("../models/user");
const auth = require("../auth");
const router = express.Router();

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");

router.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});
//Registeartion Route
router.post("/register", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log("Empty Request");
    res.status(400).send({ message: "Empty User Data" });
  } else if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    typeof req.body.name !== "string" ||
    typeof req.body.email !== "string" ||
    typeof req.body.password !== "string" ||
    !emailvalidator.validate(req.body.email)
  ) {
    res.status(400).send({ message: "Missing Property" });
    console.log("Missing Property");
    console.log({ message: req.body });
  } else {
    // hash thepassword
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const user = new users({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        try {
          user.save();
          res.status(201).send({ id: user.id });
          console.log({ message: req.body });
          console.log("success");
        } catch (err) {
          console.log(err);
          res.status(400).send({ message: err.message });
        }
      })
      .catch((e) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
        console.log({ message: e.message });
      });

    // const user = new users({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    // try {
    //   await user.save();
    //   res.status(201).send({ id: user.id });
    //   console.log({ message: req.body });
    //   console.log("successs");
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).send({ message: err.message });
    // }
  }
});

//Login Router
router.post("/login", (req, res) => {
  users
    .findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              e,
            });
          }
          //created jwt token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM_TOKEN",
            { expiresIn: "24h" }
          );

          res.status(200).send({
            message: "Login Successful",
            id: user.id,
            name: user.name,
            email: user.email,
            token,
          });
        })
        .catch((e) => {
          console.log("Password Does not match");
          res.status(400).send({
            message: "Password does not match",
            e,
          });
        });
    })
    .catch((e) => {
      console.log("User Does not exist");
      res.status(404).send({
        message: "Email not found",
      });
    });
});


module.exports = router;
