const app = require("../server");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { routes, response } = require("../server.js");

router.get("/", async (req, res) => {
    return res.render("home", { title: "Homepage" });
  });

  router.get("/user/:num", async (req, res) => {
    return res.render("user", users[req.params.num - 1]);
  });
  
  router.get("/login", async (req, res) => {
    return res.render("login", { title: "login" });
  });
  
  router.post("/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/login");
    });
  });