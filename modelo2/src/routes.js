const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = express.Router();

// importe de userController
const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");

// rotas - adicionando middware para autenticação
routes.use("/app", authMiddleware);

// rotas
//login
routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

//logout
routes.get("/app/logout", SessionController.destroy);

// cadastrar
routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.get("/app/dashboard", (req, res) => {
  console.log(req.session.user);
  return res.render("dashboard");
});

module.exports = routes;
