function checkRole(req, resp, next) {

    if (req.user.role === 'admin') {

        next()

    } else {

        return resp.status(403).json({
            message: "Only admin allowed"
        })
    }
}

module.exports = checkRole