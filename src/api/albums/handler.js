const autoBind = require('auto-bind')

class AlbumsHandler {
  constructor (AlbumsService, SongService, validator) {
    this._albumsService = AlbumsService
    this._songsService = SongService
    this._validator = validator

    autoBind(this)
  }

  async postAlbumHandler (req, h) {
    this._validator.validateAlbumPayload(req.payload)

    const albumId = await this._albumsService.addAlbum(req.payload)

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: { albumId }
    })

    response.code(201)
    return response
  }

  async getAlbumByIdHandler (req, h) {
    const { id } = req.params
    const album = await this._albumsService.getAlbumById(id)
    album.songs = await this._songsService.getSongByAlbumId(id)

    return {
      status: 'success',
      data: { album }
    }
  }

  async putAlbumByIdHandler (req, h) {
    this._validator.validateAlbumPayload(req.payload)

    const { id } = req.params
    await this._albumsService.editAlbumById(id, req.payload)
    return {
      status: 'success',
      message: 'Album berhasil diperbarui'
    }
  }

  async deleteAlbumByIdHandler (req, h) {
    const { id } = req.params
    await this._albumsService.deleteAlbumById(id)
    return {
      status: 'success',
      message: 'Album berhasil dihapus'
    }
  }
}

module.exports = AlbumsHandler
