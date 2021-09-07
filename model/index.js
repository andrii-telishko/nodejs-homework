const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const selectContact = contacts.find(contact => contact.id === +contactId)
  if (!selectContact) {
    return null
  }
  return selectContact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => contact.id === +contactId)
  if (idx === -1) {
    return null
  }
  const newContacts = contacts.filter(contact => contact.id !== +contactId)
  await updateContacts(newContacts)
  return contacts[idx]
}

const addContact = async (body) => {
  const newContact = body
  const contacts = await listContacts()
  const newContacts = [...contacts, newContact]
  await updateContacts(newContacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === +contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body }
  await updateContacts(contacts)
  return contacts[idx]
}

const updateContacts = async (contacts) => {
  const contactsString = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, contactsString)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
