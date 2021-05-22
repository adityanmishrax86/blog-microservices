const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const { logger } = require("./logger");

const app = express()
app.use(bodyParser.json());

const events = [];

app.get('/events', (req, res) => {
    res.send(events);
});

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post('http://posts:4000/events', event).catch(err => {
        logger.error(`Error ----> ${err.message}`);
    });
    axios.post('http://comments:4001/events', event).catch(err => {
        logger.error(`Error ----> ${err.message}`);

    });
    axios.post('http://query:4002/events', event).catch(err => {
        logger.error(`Error ----> ${err.message}`);

    });
    axios.post('http://moderation:4003/events', event).catch(err => {
        logger.error(`Error ----> ${err.message}`);

    });
    axios.post('http://auth:4009/events', event).catch(err => {
        logger.error(`Error ----> ${err.message}`);

    });
    logger.info("Services are working fine");
    res.send({ status: 'OK' });
})

app.listen(4005, () => {
    console.log("Listening on 4005")
});