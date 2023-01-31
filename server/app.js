const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config()
const {ENVIROMENT, PORT} = process.env;

// Routes import
const userRegistrationRoutes = require("./routes/userRegistration");
const userLoginRoutes = require("./routes/userLogin");
const tweetsRouter = require('./routes/tweetsRouters');

const app = express();


// middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json());




app.use("/register", userRegistrationRoutes);
app.use("/login", userLoginRoutes);
app.use('/tweets', tweetsRouter);


app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));