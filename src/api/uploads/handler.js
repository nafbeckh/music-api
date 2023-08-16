const autoBind = require('auto-bind')
const path = require('path')

class UploadsHandler {
  constructor (storageService, albumsService, validator) {
    this._storageService = storageService
    this._albumsService = albumsService
    this._validator = validator

    autoBind(this)
  }

  async postUploadImageHandler (req, h) {
    const { cover } = req.payload
    const { id } = req.params

    this._validator.validateImageHeaders(cover.hapi.headers)

    const filename = await this._storageService.writeFile(cover, cover.hapi)

    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/file/covers/${filename}`

    await this._albumsService.addCoverAlbum(id, coverUrl)

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil ditambahkan'
    })

    response.code(201)
    return response
  }

  async getUploadImageHandler (req, h) {
    const { filename } = req.params
    const filepath = path.resolve(__dirname, './file/covers', filename)
    return h.file(filepath)
  }
}

module.exports = UploadsHandler
