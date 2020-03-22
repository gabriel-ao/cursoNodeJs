const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = express.Router();

// importe de middleware
const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

// importe de Controllers
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");
const AppointmentController = require("./app/controllers/AppointmentController");
const AvailableController = require("./app/controllers/AvailableController");

// variável global para que todas as views passem a conhecer as mensagens de erro
routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash("seccess");
  res.locals.flashError = req.flash("error");

  return next();
});

// rotas - adicionando middware para autenticação
routes.use("/app", authMiddleware);

// rotas

// arquivos
routes.get("/files/:file", FileController.show);

//login
routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

//logout
routes.get("/app/logout", SessionController.destroy);

// cadastrar
routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

//dashboard
routes.get("/app/dashboard", DashboardController.index);

routes.get("/app/appointments/new/:provider", AppointmentController.create);

routes.get("/app/available/:provider", AvailableController.index);

module.exports = routes;
