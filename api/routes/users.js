const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const isAuth = require('../middlewares/isAuth')
const router = Router()

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(400).json({
        error: 'Incorrect username or password'
      })
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          error: 'Incorrect username or password'
        })
      }
      if (result) {
        const token = jwt.sign(
          {
            id: user.id
          },
          'somejwtkey',
          { expiresIn: '365d' }
        )

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
          success: 'Login successful',
          userId: user.id
        })
      } else {
        return res.status(400).json({
          error: 'Incorrect username or password'
        })
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/check-auth', isAuth, (req, res) => {
  res.status(200).json({ isAuthenticated: true })
})

router.post('/logout', isAuth, (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ isAuthenticated: false })
})

router.get('/profile', isAuth, async (req, res) => {
  const id = req.user.id
  const user = await User.findByPk(id)
  user.password = ''
  res.status(200).json(user)
})

router.patch('/profile', isAuth, async (req, res) => {
  try {
    const id = req.user.id
    const newUserData = req.body

    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    Object.keys(newUserData).forEach((key) => {
      if (
        key !== 'password' &&
        newUserData[key] !== undefined &&
        newUserData[key] !== ''
      ) {
        user[key] = newUserData[key]
      }
    })

    if (newUserData.password) {
      user.password = await bcrypt.hash(newUserData.password, 12)
    }

    await user.save()

    res.status(200).json({ ...user.get({ plain: true }), password: '' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
