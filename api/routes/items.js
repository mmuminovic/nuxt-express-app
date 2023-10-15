const { Router } = require('express')
const Item = require('../models/item')
const isAuth = require('../middlewares/isAuth')

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    return res.status(200).json(item)
  } catch (err) {
    return res.status(500).json({
      message: 'Server error'
    })
  }
})

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    return res.status(200).json(items)
  } catch (err) {
    return res.status(500).json({
      message: 'Server error'
    })
  }
})

router.post('/', isAuth, async (req, res, next) => {
  try {
    const { name, date, important } = req.body
    const newItem = await Item.create({ name, date, important })
    return res.status(201).json(newItem)
  } catch (err) {
    return res.status(500).json({
      message: 'Server error'
    })
  }
})

router.patch('/:id', isAuth, async (req, res, next) => {
  try {
    const itemId = req.params.id
    const { name, date, important } = req.body
    const item = await Item.findByPk(itemId)

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      })
    }

    item.name = name
    item.date = date
    item.important = important
    await item.save()

    return res.status(200).json(item)
  } catch (err) {
    return res.status(500).json({
      message: 'Server error'
    })
  }
})

router.delete('/:id', isAuth, async (req, res, next) => {
  try {
    const itemId = req.params.id
    const item = await Item.findByPk(itemId)

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      })
    }

    await item.destroy()

    return res.status(204).send()
  } catch (err) {
    return res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router
