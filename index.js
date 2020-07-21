const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv-flow').config();

const urlHandler = require('./urlhandler');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


app.get('/r', async (req, res) =>{
    res.send({
        success: true,
        message: "Welcome to Fankle!"
    })
})

app.get('/r/:id', urlHandler.redirToBaseUrl);

app.post('/r/url', urlHandler.generateUrl)

app.use((error, req, res, next) => {
    res.json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
});


PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})