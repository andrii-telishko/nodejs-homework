const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/contact')
const { validation, controlsWrapper } = require('../../middlewares')
const { contactsControllers: ctrl } = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', controlsWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controlsWrapper(ctrl.addContact))

router.delete('/:contactId', controlsWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema), controlsWrapper(ctrl.updateContact))

router.patch('/:contactId', controlsWrapper(ctrl.updateStatusContact))

module.exports = router
