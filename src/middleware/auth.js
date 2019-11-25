const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'gennadiyfurduyproject')
        const user = await User.findOne({ _id: decoded._id, token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.redirect("/")
    }
}

module.exports = auth