const { Contact } = require('../models')

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({})
  res.json({
    contacts
  })
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    return res.status(404).json({
      message: 'Not found'
    })
  }
  res.json({
    contact
  })
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const deleteContact = await Contact.findByIdAndDelete(contactId)
  if (!deleteContact) {
    return res.status(404).json({
      message: 'Not found'
    })
  }
  res.json({
    deleteContact
  })
}

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body)
  res.status(201).json({
    result
  })
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!updateContact) {
    return res.status(404).json({
      message: 'Not found'
    })
  }
  res.json({
    updateContact
  })
}

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const updateProduct = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!updateProduct) {
    return res.status(404).json({
      message: 'missing field favorite'
    })
  }
  res.json({
    updateProduct
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
