const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
let user = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, status, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, status, content, postId } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }

    if (type === 'UserCreated' || type === 'UserLoggedIn') {
        user = data;
    }

    if (type === 'UserLoggedOut') user = {};
}

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.get('/user', (req, res) => {
    res.status(200).send(user);
})

app.listen(4002, async () => {
    console.log("Listening on 4002");

    try {
        const res = await axios.get("http://event-bus:4005/events");

        for (let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    } catch (err) {
        console.log(err?.message);
    }
})
