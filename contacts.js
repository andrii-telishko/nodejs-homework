const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db/contacts.json')

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    throw error
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const selectContact = contacts.find(contact => contact.id === contactId)
    if (!selectContact) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    return selectContact
  } catch (error) {
    throw error
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(contact => contact.id === contactId)
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    const newContacts = contacts.filter(contact => contact.id !== contactId)
    await updateContacts(newContacts)
    return contacts[idx]
  } catch (error) {
    throw error
  }
};

async function addContact(name, email, phone) {
  try {
    const newContact = { name, email, phone, id: v4() }
    const contacts = await listContacts()
    const newContacts = [...contacts, newContact]
    await updateContacts(newContacts)
    return newContact
  } catch (error) {
    throw error
  }
};

async function updateContacts (contacts) {
  const contactsString = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, contactsString)
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
