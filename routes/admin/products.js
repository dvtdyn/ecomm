const express = require('express')
const multer = require('multer')

const { handleErrors, requireAuth } = require('./middlewares.js')
const productsRepo = require('../../repositories/products.js')
const productsIndexTemplate = require('../../views/admin/products/index.js')
const productsNewTemplate = require('../../views/admin/products/new.js')

const { requireTitle, requirePrice } = require('./validators.js')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await productsRepo.getAll()
  res.send(productsIndexTemplate({ products }))
  console.log(productsIndexTemplate({ products }))
})

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(productsNewTemplate({}))
})

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64')
    const { title, price } = req.body

    await productsRepo.create({ title, price, image })

    res.redirect('/admin/products')
  }
)

module.exports = router
