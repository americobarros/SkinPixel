/* server.js for react-express-authentication */
"use strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = 'test@user.com'
//////

const log = console.log;
const path = require('path')

const express = require("express");
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
// const { Student } = require("./models/student");
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)


// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                                                mongoUrl: 'mongodb+srv://mymongo:mymongo@cluster0.ihqrm.mongodb.net/SkinPixelAPI'
                                 }) : null
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send(user);
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
        req.session.user = TEST_USER_ID;
        req.session.email = TEST_USER_EMAIL;
        res.send({ currentUser: TEST_USER_EMAIL })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
// User API Route
app.post('/api/users', mongoChecker, async (req, res) => {
    log(req.body)

    var current_date=new Date();

    // Create a new user
    const user = new User({
        createdAt: current_date,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a GET route to get all students
app.get('/api/users', mongoChecker, authenticate, async (req, res) => {

    // Get the students
    try {
        const users = await Student.find({ isAdmin: true })
        // res.send(students) // just the array
        res.send({ users }) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// POST route to create skin
app.post('/newskin', mongoChecker, async (req, res) => {
    log(req.body)

    var current_date=new Date();

	// create the mf skin
    const skin = new Skin({
        id: Math.random(),
        createdAt: current_date,
        image: req.body.image,
        name: req.body.name,
        skin2D: req.body.skin2D,
        username: req.body.username,
    })

    // save the mf skin now
    try {
        const newSkin = await user.save()
        res.send(newSkin)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// PATCH route to edit skin
app.patch('/skin/edit/:skinId', mongoChecker, async (req, res) => {
	// get wildcards
    const skin_id = req.params.id

	// try {
	// 	const restaurant = await Restaurant.findById(id)
	// 	if (!restaurant) {
	// 		res.status(404).send('Resource not found')  // could not find this student
	// 	} else { 
	// 		const patched_reservation = restaurant.reservations.id(resv_id)
	// 		patched_reservation = [req.body.time, req.body.people]
	// 		const result = await restaurant.save()	
	// 		if (!result) {
	// 			res.status(404).send()
	// 		} else {   
	// 			res.send({reservation: patched_reservation, restaurant: result})
	// 		}
			
	// 	}
	// } catch(error) {
	// 	log(error)
	// 	res.status(500).send('Internal Server Error')  // server error
	// }
})

// GET route to get skin

// other student API routes can go here...
// ...

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/frontend/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", 
                            "/account",

                            // patch (edit)
                            "/skin/edit/:skinId",
                            "/resource/edit/:resourceId",
                            "/map/edit/:mapId",

                            // get (view)
                            "/map/:mapId",
                            "/resource/:resourceId",
                            "/skin/:skinId",
                            
                            // post (create)
                            "/newskin",
                            "/newmap",
                            "/newresource"
                        ];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
