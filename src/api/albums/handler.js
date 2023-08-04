const autoBind = require('auto-bind')

class AlbumsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postAlbumHandler (req, h) {
    this._validator.validateAlbumPayload(req.payload)

    const { name = 'unnamed', year } = req.payload
    const albumId = this._service.addAlbum({ name, year })

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId
      }
    })

    response.code(201)
    return response
  }

  async getAlbumsHandler () {
    const albums = this._service.getAlbums()
    return {
      status: 'success',
      data: {
        albums
      }
    }
  }

  async getAlbumByIdHandler (req, h) {
    const { id } = req.params
    const album = this._service.getAlbumById(id)
    return {
      status: 'success',
      data: {
        album
      }
    }
  }

  async putAlbumByIdHandler (req, h) {
    this._validator.validateAlbumPayload(req.payload)

    const { id } = req.params
    this._service.editAlbumById(id, req.payload)
    return {
      status: 'success',
      message: 'Album berhasil diperbarui'
    }
  }

  async deleteAlbumByIdHandler (req, h) {
    const { id } = req.params
    this._service.deleteAlbumById(id)
    return {
      status: 'success',
      message: 'Album berhasil dihapus'
    }
  }
}

module.exports = AlbumsHandler
