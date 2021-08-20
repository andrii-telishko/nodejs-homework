const fs = require('fs/promises')
const { v4 } = require('uuid')
const contactsList = require('./contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsList)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
