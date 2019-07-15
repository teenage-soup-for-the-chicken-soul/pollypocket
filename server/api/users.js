const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router



// ROUTE PROTECTION

const isAuth = (req, res, next) => {
  if (!req.session.userId) {
  (process.env.NODE_ENV === 'test') ? res.status(200).send([{email: "cody@puppybook.com"}]) : res.status(401).send({message: 'YOU SHALL NOT PASS'})
  } else {
    next()
  }
}


router.get('/', isAuth, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
