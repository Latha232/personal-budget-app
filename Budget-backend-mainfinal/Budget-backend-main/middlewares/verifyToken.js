const jwt = require('jsonwebtoken')
const users = require('../models/users')

module.exports = verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']
    try {
        if (!token) {
            return res.json({ status: 401, message: 'No token provided!' })
        }
        jwt.verify(token, 'uiREjuGp*&88huHJV', (err, decoded) => {
            if (err) {
                return res.json({ status: 401, message: 'Invalid Token!' })
            } else {
                let email = decoded
                users.findOne({ email: email })
                    .then((data) => {
                        if (data) {
                            req.user = data
                            next()
                        } else {
                            return res.json({ status: 401, message: 'Invalid Token!' })
                        }
                    })
            }
        })
    } catch (error) {
        return res.json({ status: 500, error: error })
    }
}
