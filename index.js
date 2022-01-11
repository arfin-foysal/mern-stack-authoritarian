const express = require('express');
const cors = require('cors');
const router = require('./routers/userRouter');
var bodyParser = require('body-parser');
const auth = require('./middlewares/authUser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
require('dotenv').config();
require("./utils/passport")
const port =process.env.PORT || 6000
app.use(cors({
    origin: "http://localhost:3000/",
    methods: "GET,POST,PUT,DELETE",
    credentials:true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine','ejs');
app.use(cookieSession(
    {
        name: "session",
        keys: ["token"],
        maxAge:20*60*60*100,
    }
))

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
require('./DB/db')

// Routing
app.use('/api', router)


app.get('/',auth, (req, res) => {
    res.send("hello")
})

// Server Connection
app.listen(port, () => {
    console.log('Server is Running Port '+ port);
})
