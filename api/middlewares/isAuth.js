const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, 'somejwtkey')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
}
