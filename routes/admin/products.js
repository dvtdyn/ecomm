const express = require('express')
const multer = require('multer')

const { handleErrors } = require('./middlewares.js')
const productsRepo = require('../../repositories/products.js')
const productsNewTemplate = require('../../views/admin/products/new.js')

const { requireTitle, requirePrice } = require('./validators.js')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/admin/products', (req, res) => {})

router.get('/admin/products/new', (req, res) => {
  res.send(productsNewTemplate({}))
})

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64')
    const { title, price } = req.body

    await productsRepo.create({ title, price, image })

    res.send('submitted')
  }
)

module.exports = router
