const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const api = require('./routes/api')

const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api());

app.use('/', express.static(path.resolve(`${__dirname}/client/build`)));

app.get('/*', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.sendFile(path.resolve(`${__dirname}/client/build/index.html`));
});

server.listen(port, () => console.log('server started'))
