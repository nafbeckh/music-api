const autoBind = require('auto-bind')

class ExportsHandler {
  constructor (producerService, playlistsService, validator) {
    this._producerService = producerService
    this._playlistsService = playlistsService
    this._validator = validator

    autoBind(this)
  }

  async postExportPlaylistSongsHandler (req, h) {
    this._validator.validateExportPlaylistPayload(req.payload)

    const { id: userId } = req.auth.credentials
    const { playlistId } = req.params

    await this._playlistsService.verifyPlaylistIsExist(playlistId)
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId)

    const message = {
      userId,
      playlistId,
      targetEmail: req.payload.targetEmail
    }

    await this._producerService.sendMessage('export:playlist', JSON.stringify(message))

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses'
    })

    response.code(201)
    return response
  }
}

module.exports = ExportsHandler
