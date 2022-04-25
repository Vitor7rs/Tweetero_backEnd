import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const user = req.body;
    users.push(user);

    res.send("OK");
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;

    tweets.push(tweet);

    res.send("OK");
});

app.get("/tweets", (req, res) => {
    const screenTweets = [];
    if ((tweets.length !== 0) && (tweets.length<=10)) {

        for (let i = 0; i < tweets.length; i++) {
            let tweet = {
                "username": tweets[i].username,
                "avatar": users.find((user) => user.username === tweets[i].username).avatar,
                "tweet": tweets[i].tweet,
            };
            screenTweets.push(tweet);
        }
    }
    else if(tweets.length){
        for (let i = tweets.length - 9; i < tweets.length; i++) {
            let tweet = {
                "username": tweets[i].username,
                "avatar": users.find((user) => user.username === tweets[i].username).avatar,
                "tweet": tweets[i].tweet,
            };
            screenTweets.push(tweet);
            if(screenTweets.length === 10){
                break;
            }
        }
    }
    screenTweets.reverse();
    res.send(screenTweets);
});

app.listen(5000, () => { console.log('playing api') });