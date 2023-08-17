const autoBind = require('auto-bind')

class AlbumsHandler {
  constructor (AlbumsService, AlbumLikesService, SongService, validator) {
    this._albumsService = AlbumsService
    this._albumLikesService = AlbumLikesService
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

  async postAlbumLikeHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const { id } = req.params

    await this._albumsService.getAlbumById(id)
    await this._albumLikesService.verifyAlbumLikeIsExist(userId, id)
    await this._albumLikesService.addAlbumLike(userId, id)

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album'
    })

    response.code(201)
    return response
  }

  async getAlbumLikesByIdHandler (req, h) {
    const { id } = req.params

    const [likes, cache] = await this._albumLikesService.getAlbumLikesById(id)

    const response = h.response({
      status: 'success',
      data: { likes }
    })

    if (cache) {
      response.header('X-Data-Source', 'cache')
    }

    return response
  }

  async deleteAlbumLikeHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const { id } = req.params

    await this._albumLikesService.deleteAlbumLike(userId, id)

    return {
      status: 'success',
      message: 'Batal menyukai album'
    }
  }
}

module.exports = AlbumsHandler
