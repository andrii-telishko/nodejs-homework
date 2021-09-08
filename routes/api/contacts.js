const express = require('express')
const contactsOperations = require('../../model')
const contactsSchema = require('../../validation/contactsSchema')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await contactsOperations.listContacts()
    res.json({
      products
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({
      contact
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const newProduct = await contactsOperations.addContact(req.body)
    res.status(201).json({
      newProduct
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deletedContact = await contactsOperations.removeContact(contactId)
    if (!deletedContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({
      deletedContact
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const { contactId } = req.params
    const updateContact = await contactsOperations.updateContact(contactId, req.body)
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({
      updateContact
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
