
const jwt = require('jsonwebtoken')

const authentification = (req, resp, next) => {

    try {

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {

            const token =
                req.headers.authorization.split(" ")[1]

            if (!token) {

                return resp.status(401).json({
                    message: "Token not found"
                })
            }

            const verify = jwt.verify(
                token,
                process.env.JWT_SECRET
            )

            req.user = verify

            next()

        } else {

            return resp.status(401).json({
                message: "Authorization header missing"
            })
        }

    } catch (error) {

        return resp.status(401).json({
            message: error.message
        })
    }
}

module.exports = {
    authentification
}
