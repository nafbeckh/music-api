const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AlbumLikeModel = require('../../utils/models/AlbumLikeModel')

class AlbumLikesService {
  constructor (cacheService) {
    this._pool = new Pool()
    this._cacheService = cacheService
  }

  async addAlbumLike (userId, albumId) {
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: new AlbumLikeModel({ userId, albumId }).getModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menyukai album')
    }

    await this._cacheService.delete(`album:${albumId}`)

    return result.rows[0].id
  }

  async getAlbumLikesById (albumId) {
    try {
      const result = await this._cacheService.get(`album:${albumId}`)
      return [JSON.parse(result), true]
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(1) FROM user_album_likes WHERE album_id = $1',
        values: [albumId]
      }

      const result = await this._pool.query(query)

      if (!result.rows.length) {
        throw new NotFoundError('Gagal mengambil album like')
      }

      const likes = parseInt(result.rows[0].count)

      await this._cacheService.set(`album:${albumId}`, likes)

      return [likes, false]
    }
  }

  async deleteAlbumLike (userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal batal menyukai album')
    }

    await this._cacheService.delete(`album:${albumId}`)
  }

  async verifyAlbumLikeIsExist (userId, albumId) {
    const query = {
      text: 'SELECT user_id, album_id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId]
    }

    const result = await this._pool.query(query)

    if (result.rows.length) {
      throw new InvariantError('Tidak bisa menyukai album ini lagi')
    }
  }
}

module.exports = AlbumLikesService
