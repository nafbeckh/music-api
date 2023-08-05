const autoBind = require('auto-bind')

class SongsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postSongHandler (req, h) {
    this._validator.validateSongPayload(req.payload)

    const songId = await this._service.addSong(req.payload)

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: { songId }
    })

    response.code(201)
    return response
  }

  async getSongsHandler (req, h) {
    let songs = await this._service.getAllSongs()

    const { title, performer } = req.query

    if (title) {
      songs = songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()))
    }

    if (performer) {
      songs = songs.filter(song => song.performer.toLowerCase().includes(performer.toLowerCase()))
    }

    return {
      status: 'success',
      data: { songs }
    }
  }

  async getSongByIdHandler (req, h) {
    const { id } = req.params
    const song = await this._service.getSongById(id)
    return {
      status: 'success',
      data: { song }
    }
  }

  async putSongByIdHandler (req, h) {
    this._validator.validateSongPayload(req.payload)

    const { id } = req.params
    await this._service.editSongById(id, req.payload)
    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui'
    }
  }

  async deleteSongByIdHandler (req, h) {
    const { id } = req.params
    await this._service.deleteSongById(id)
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus'
    }
  }
}

module.exports = SongsHandler
