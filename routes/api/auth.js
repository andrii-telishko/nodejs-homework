const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validation, controlsWrapper } = require('../../middlewares')
const { authControllers: ctrl } = require('../../controllers')

router.post('/register', validation(joiSchema), controlsWrapper(ctrl.register))

module.exports = router
