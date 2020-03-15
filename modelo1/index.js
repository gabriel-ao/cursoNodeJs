const express = require("express");

const app = express();

const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );
  req.appName = "GoNode";
  return next();
};

// app.get("/", (req, res) => {
//   return res.send("heloo corona");
// });

app.use(logMiddleware);

app.get("/", (req, res) => {
  return res.send(`Bem-vindo ao ${req.appName}, ${req.query.name}`);
});

app.get("/nome/:name", (req, res) => {
  return res.json({
    message: `welcome, ${req.params.name}`
  });
});

app.listen(3000);

// server http
// const http = require("http");

// http
//   .createServer((req, res) => {
//     return res.end("Hello world");
//   })
//   .listen(3000);
