const validation = (schema) => {
  const validFunc = (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'Помилка від Joi або іншої бібліотеки валідації'
      })
    }
    next()
  }
  return validFunc
}

module.exports = validation
