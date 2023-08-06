const autoBind = require('auto-bind')

class UsersHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postUserHandler (req, h) {
    this._validator.validateUserPayload(req.payload)

    const userId = await this._service.addUser(req.payload)

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { userId }
    })

    response.code(201)
    return response
  }
}

module.exports = UsersHandler
