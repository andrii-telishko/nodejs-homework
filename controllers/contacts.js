const { Contact } = require('../model')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
    res.json({
      contacts
    })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)
    res.status(201).json({
      result
    })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
