const express = require('express');
require('express-async-errors');
const YAML = require('yamljs');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const errorMiddleware = require('./middlewares/errorMiddlewarer');
require('dotenv').config();

const swaggerDocument = YAML.load('docs.yml');

const productsRouter = require('./routers/productsRouters');
const salesRouter = require('./routers/salesRouters');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;