const autoBind = require('auto-bind')

class CollaborationsHandler {
  constructor (collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService
    this._playlistsService = playlistsService
    this._validator = validator

    autoBind(this)
  }

  async postCollaborationHandler (req, h) {
    this._validator.validatePostCollaborationPayload(req.payload)

    const { id: ownerId } = req.auth.credentials
    const { playlistId, userId } = req.payload

    await this._playlistsService.verifyPlaylistIsExist(playlistId)
    await this._playlistsService.verifyPlaylistOwner(playlistId, ownerId)

    const collaborationId = await this._collaborationsService.addCollaboration(
      { playlistId, userId }
    )

    const response = h.response({
      status: 'success',
      message: 'Collaboration berhasil ditambahkan',
      data: { collaborationId }
    })

    response.code(201)
    return response
  }

  async deleteCollaborationHandler (req, h) {
    this._validator.validatePostCollaborationPayload(req.payload)

    const { id: ownerId } = req.auth.credentials
    const { playlistId, userId } = req.payload

    await this._playlistsService.verifyPlaylistOwner(playlistId, ownerId)
    await this._collaborationsService.deleteCollaboration({ playlistId, userId })

    return {
      status: 'success',
      message: 'Collaboration berhasil dihapus'
    }
  }
}

module.exports = CollaborationsHandler
