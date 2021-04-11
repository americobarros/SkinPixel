/* server.js for react-express-authentication */
"use strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_USERNAME = 'test@user.com'
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
const { Skin } = require("./models/skin");
const { Map } = require("./models/map");
const { Resource } = require("./models/resource");

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
app.disable('etag');
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
app.post("/users/login", mongoChecker, async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
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
        req.session.username = TEST_USER_USERNAME;
        res.send({ currentUser: TEST_USER_USERNAME })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.username });
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

// a GET route to get all users
app.get('/api/users', mongoChecker, async (req, res) => {

    try {
        const users = await User.find()
        res.send(users) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// other student API routes can go here...
// ...
// a GET route to get a certain user
app.get('/api/users/:id', mongoChecker, async (req, res) => {

    const id = req.params.id

    try {
        const user = await User.findById(id)
        if (!user) {
			res.status(404).send('Resource not found')
		} else { 
			res.send(user)
		}
        
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a DELETE route to delete a certain user
app.delete('/api/users/:id', mongoChecker, async (req, res) => {

    const id = req.params.id

    try {
        const user = await User.remove({ _id: id })
        if (!user) {
			res.status(404).send('Resource not found')
		} else { 
			res.send(user)
		}
        
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a PATCH route to edit a user's credentials
app.patch('/api/users/:id', mongoChecker, async (req, res) => {

    const id = req.params.id

    const username = req.body.username;
    const bio = req.body.bio;
    const password = req.body.password;
    const email = req.body.email;

    try {
        const user = await User.findOneAndUpdate({_id: id}, {$set: { username: username, bio: bio, password: password, email: email }}, { new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(user)
		}
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// SKINS ------------------------------------------------------------------------------------------------

// POST route to create skin
app.post('/api/newskin', mongoChecker, async (req, res) => {
    log(req.body)

    let current_date=new Date();

	// create the mf skin
    const skin = new Skin({
        id: Math.random(),
        createdAt: current_date,
        image: req.body.image,
        name: req.body.name,
        skin2D: req.body.skin2D,
        username: req.body.username,
        user: req.body.user
    })

    // save the mf skin now
    try {
        const newSkin = await skin.save()
        res.send(newSkin)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing.
        }
    }
})

// GET route to get skin

app.get('/api/skins', mongoChecker, async (req, res) => {
    let img_id = req.query.image_id;
    let user_id = req.query.user_id;
    try {
        if (img_id) {
            const skins = await Skin.findById(img_id);
            res.send(skins);
        } else if (user_id) {
            const skins = await Skin.find({"user": user_id}, '-skin2D');
            const response = {"skins": skins};
            log(response);
            res.status(200).send(response);
        } else {
            const skins = await Skin.find({}, '-skin2D');
            const response = {"skins": skins};
            res.send(response);
        }
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// PATCH route to edit skin
app.patch('/api/skin/:skinId', mongoChecker, async (req, res) => {
	// get wildcards
    const id = req.params.skinId

    const fieldsToUpdate = {}

    try {
        const skin = await Skin.findOneAndUpdate({_id: id}, {$set: req.body}, { new: true, useFindAndModify: false})
		if (!skin) {
		    log(id);
		    log('not found');
			res.status(404).send('Resource not found');
		} else {   
			res.send(skin);
		}
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})





// MAPS ------------------------------------------------------------------------------------------------

// POST route to create map
app.post('/api/maps', mongoChecker, async (req, res) => {
    log(req.body)

    var current_date=new Date();

	// create the mf map
    const map = new Map({
        createdAt: current_date,
        image: req.body.image,
        file: req.body.file,
        name: req.body.name,
        username: req.body.username
    })

    // save the mf map now
    try {
        const newMap = await map.save()
        res.send(newMap)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing.
        }
    }
})

// PATCH route to edit map
app.patch('/api/maps/:id', mongoChecker, async (req, res) => {
	// get wildcards
    const id = req.params.id

    const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1)
		fieldsToUpdate[propertyToChange] = change.value
	})

    try {
        const map = await map.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, { new: true, useFindAndModify: false})
		if (!map) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(map)
		}
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get a map
app.get('/api/maps/:id', mongoChecker, async (req, res) => {

    const id = req.params.id

    try {
        const map = await Map.findById(id)
        if (!map) {
			res.status(404).send('Resource not found')
		} else {
			res.send(map)
		}

    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get all maps
app.get('/api/map', mongoChecker, async (req, res) => {

    try {
        const maps = await Map.find()
        res.send(maps)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// RESOURCES ------------------------------------------------------------------------------------------------

// POST route to create resource
app.post('/api/resource', mongoChecker, async (req, res) => {
    log(req.body)

    var current_date=new Date();

	// create the mf resource
    const resource = new Resource({
        createdAt: current_date,
        image: req.body.image,
        file: req.body.file,
        name: req.body.name,
        user: req.body.user
    })

    // save the mf resource now
    try {
        const newResource = await resource.save()
        res.send(newResource)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// PATCH route to edit resource
app.patch('/api/resource/:id', mongoChecker, async (req, res) => {
	// get wildcards
    const id = req.params.id

    const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1)
		fieldsToUpdate[propertyToChange] = change.value
	})

    try {
        const resource = await Resource.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, { new: true, useFindAndModify: false})
		if (!resource) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(resource)
		}
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get a resource
app.get('/api/resource/:id', mongoChecker, async (req, res) => {

    const id = req.params.id

    try {
        const resouce = await Resource.findById(id)
        if (!resource) {
			res.status(404).send('Resource not found')
		} else {
			res.send(resource)
		}

    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// a GET route to get all resource packs
app.get('/api/resource', mongoChecker, async (req, res) => {

    try {
        const resources = await Resource.find()
        res.send(resources)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/frontend/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", 
                            "/account",
                            "/skin/:id",
                            "/resource/:id",
                            "/map/:id",
                            "/map",
                            "/skin",
                            "/resource"
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
