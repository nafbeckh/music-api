const autoBind = require('auto-bind')

class PlaylistsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postPlaylistHandler (req, h) {
    this._validator.validatePostPlaylistPayload(req.payload)

    const { name } = req.payload
    const { id: owner } = req.auth.credentials

    const playlistId = await this._service.addPlaylist({ name, owner })

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: { playlistId }
    })

    response.code(201)
    return response
  }

  async getPlaylistsByUserIdHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const playlists = await this._service.getPlaylistByUserId({ userId })

    return {
      status: 'success',
      data: { playlists }
    }
  }

  async deletePlaylistByIdHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const { id } = req.params
    await this._service.deletePlaylistById({ id, userId })

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus'
    }
  }
}

module.exports = PlaylistsHandler
