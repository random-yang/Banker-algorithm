const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
// 用第三方中间件例如 body-parser 也可以
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: '银行家算法',
  })
);

// Members API Routes
app.use('/api/bank', require('./routes/api/bank'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running at port http://localhost:${PORT}`));
