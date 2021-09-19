const controlsWrapper = (ctrl) => {
  const controlsFn = async (req, res, next) => {
    try {
      await ctrl(req, res, next)
    } catch (error) {
      next(error)
    }
  }
  return controlsFn
}

module.exports = controlsWrapper
