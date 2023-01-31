const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config()
const {ENVIROMENT, PORT} = process.env;

// Routes import
const userRegistrationRoutes = require("./routes/userRegistration");
const userLoginRoutes = require("./routes/userLogin");

const app = express();


// middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json());




app.use("/register", userRegistrationRoutes);
app.use("/login", userLoginRoutes);


app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));