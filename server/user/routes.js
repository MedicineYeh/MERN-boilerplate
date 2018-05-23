const User = require('./models/user');

async function fetchUserInfo(req, res, next) {
    const {user} = req;
    try {
        // Fetch user info from database for the latest result.
        const userMatched = await User.findById(user._id);

        if (!userMatched) {
            res.status(401).send({error: 'User not found'});
        } else {
            respondAuth(res, userMatched);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = (app) => {
    app.get('/api/auth/me', fetchUserInfo); // auth path is already with verification of jwt
};
