const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

const logMiddleware = (req, res) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD ${req.method}`
  );
  return next();
};

//app.use(logMiddleware);
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

// rotas
app.get('/', (req, res) => {
  return res.render('age');
});

app.post('/resultado', (req, res) => {
  if (req.body.age >= 18) {
    return res.render('major', { age: req.body.age });
  } else {
    return res.render('minor', { age: req.body.age });
  }
});

app.listen(3000);
