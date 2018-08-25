const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (error) {
      return res.status(401).json({
        message: 'Auth Failed'
      })
    }
  } else {    
    return res.status(401).json({
      message: 'Auth token missing'
    })
  }
}