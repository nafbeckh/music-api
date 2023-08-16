const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const { PostAlbumModel, GetAlbumModel, PutAlbumModel } = require('../../utils/models/albums')

class AlbumsService {
  constructor () {
    this._pool = new Pool()
  }

  async addAlbum (payload) {
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: new PostAlbumModel(payload).getInsertModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async getAlbumById (id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan')
    }

    return new GetAlbumModel(result.rows[0]).getModel()
  }

  async editAlbumById (id, payload) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: new PutAlbumModel(id, payload).getUpdateModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan')
    }
  }

  async deleteAlbumById (id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan')
    }
  }

  async addCoverAlbum (id, coverUrl) {
    const query = {
      text: 'UPDATE albums SET cover = $2 WHERE id = $1 RETURNING id',
      values: [id, coverUrl]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Sampul gagal ditambahkan')
    }
  }
}

module.exports = AlbumsService
