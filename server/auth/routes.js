const jwt = require('jsonwebtoken');
const validator = require('validator');
const passwordValidator = require('password-validator');

const User = require.main.require('./user').models.user;
const config = require.main.require('./config');

// Create a schema
const passwordSchema = new passwordValidator()
    .is().min(6)
    .is().max(100)
    .has().letters()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

/* These are sample codes where you can use as express route middlewares */
// const requireAuth = passport.authenticate('jwt', {session: false});
// const requireLogin = passport.authenticate('local', {session: false});

function createCleandUser(user) {
    // A tricky way to clone user object.
    const cleandUser = JSON.parse(JSON.stringify(user));
    // NOTE: Be very careful to mask out sensitive fields.
    delete cleandUser.password;
    delete cleandUser.__v;
    delete cleandUser.id;
    delete cleandUser._id;

    return cleandUser;
}

// TODO Show message to user if the session is timeout
// Define functions for authentication systems
function tokenForUser(user) {
    return jwt.sign({
        user: createCleandUser(user),
    }, config.JWT_SECRET, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
        subject: user.id,
    });
}

function respondAuth(res, user) {
    if (user) {
        res.json({
            user: createCleandUser(user),
            token: tokenForUser(user),
        });
    } else {
        setTimeout(() => {
            res.status(401).send({error: 'Incorrect username/password'});
        }, 300); // Timout 0.3 second to prevent attack
    }
}

// This function is called after passport verification of local strategey
async function login(req, res, next) {
    const {password, email} = req.body;

    try {
        const userMatched = await User.findOne({email});
        if (!userMatched) {
            respondAuth(res);
        } else {
            const samePassword = await userMatched.comparePassword(password);
            // Respond with user info or fail
            respondAuth(res, samePassword ? userMatched : false);
        }
    } catch (err) {
        next(err);
    }
}

// Use new async await to mongoose and bycrypt
async function signup(req, res, next) {
    const user = req.body;

    // Confirm password
    if (user.password !== user.confirmedPassword) {
        return res.status(422).json({error: 'Password does not match'});
    }

    // + '' to ensure the type is string
    if (!validator.isEmail(user.email + '')) {
        return res.status(422).json({error: 'Email format error'});
    }
    if (!passwordSchema.validate(user.password + '')) {
        return res.status(422).json({error: 'Password format error'});
    }

    try {
        const userMatched = await User.findOne({'email': user.email});
        if (userMatched) {
            res.status(409).json({
                error: 'Email has been used already.',
            });
        } else {
            // Use 'user' to create Mongoose user object directly.
            const newUser = new User(user);
            newUser.save()
                .then(() => respondAuth(res, newUser))
                .catch(next);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = (app) => {
    app.post('/api/login', login);
    app.post('/api/signup', signup);
};
