
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

//CORS
app.use(cors());

// Route includes-  
const userRouter = require('./routes/user.router');
const paintingsRouter= require('./routes/paintings.router');
const paintingDetailsRouter = require('./routes/painting.details.router');
const userAccountRouter= require('./routes/user.account.router');
const paintingComponentRouter = require('./routes/painting.component.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/paintings', paintingsRouter);
app.use('/api/paintingDetails', paintingDetailsRouter);
app.use('/api/account', userAccountRouter);
app.use('/api/components', paintingComponentRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
