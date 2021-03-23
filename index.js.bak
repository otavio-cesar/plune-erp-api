const cors = require('cors');
const express = require('express')
const routes = require('./src/routes');

const app = express();
const port = 8000;

app.use(cors()); // permite recebimento de requisições
app.use(express.json()); // altera padrão de dados
app.use(routes); // adiciona modulo de rotas

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
