const autoBind = require('auto-bind')

class UsersHandler {
  constructor (authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService
    this._usersService = usersService
    this._tokenManager = tokenManager
    this._validator = validator

    autoBind(this)
  }

  async postAuthenticationHandler (req, h) {
    const { payload: requestPayload } = req
    this._validator.validatePostAuthenticationPayload(requestPayload)
    const id = await this._usersService.verifyUserCredential(requestPayload)

    const accessToken = this._tokenManager.generateAccessToken({ id })
    const refreshToken = this._tokenManager.generateRefreshToken({ id })

    await this._authenticationsService.addRefreshToken(refreshToken)

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken
      }
    })

    response.code(201)
    return response
  }

  async putAuthenticationHandler (req, h) {
    this._validator.validatePutAuthenticationPayload(req.payload)
    const { refreshToken } = req.payload
    await this._authenticationsService.verifyRefreshToken(refreshToken)
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken)

    const accessToken = this._tokenManager.generateAccessToken({ id })

    return {
      status: 'success',
      message: 'Access token berhasil diperbarui',
      data: { accessToken }
    }
  }

  async deleteAuthenticationHandler (req, h) {
    this._validator.validateDeleteAuthenticationPayload(req.payload)

    const { refreshToken } = req.payload
    await this._authenticationsService.verifyRefreshToken(refreshToken)
    await this._authenticationsService.deleteRefreshToken(refreshToken)

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus'
    }
  }
}

module.exports = UsersHandler
