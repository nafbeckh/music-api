const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')
const {
  PostPlaylistModel
} = require('../../utils/models/playlists')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async addPlaylist (payload) {
    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id',
      values: new PostPlaylistModel(payload).getInsertModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async getPlaylistByUserId ({ userId }) {
    const query = {
      text: `SELECT p.id, p.name, u.username
             FROM playlists AS p
             INNER JOIN users as u ON p.owner = u.id
             LEFT JOIN collaborations as c ON c.playlist_id = p.id
             WHERE p.owner = $1 OR c.user_id = $1`,
      values: [userId]
    }

    const result = await this._pool.query(query)

    return result.rows
  }

  async getPlaylistById (id, userId) {
    await this.verifyPlaylistIsExist(id, userId)
    await this.verifyPlaylistAccess(id, userId)

    const query = {
      text: `SELECT p.id, p.name, u.username
             FROM playlists AS p
             INNER JOIN users as u ON p.owner = u.id
             LEFT JOIN collaborations as c ON c.playlist_id = p.id
             WHERE (p.owner = $1 OR c.user_id = $1) AND p.id = $2`,
      values: [userId, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan')
    }

    return result.rows[0]
  }

  async deletePlaylistById ({ id, userId }) {
    await this.verifyPlaylistOwner(id, userId)

    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan')
    }
  }

  async verifyPlaylistOwner (id, userId) {
    const query = {
      text: 'SELECT owner FROM playlists WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (result.rows[0].owner !== userId) {
      throw new AuthorizationError('Anda bukan pemilik playlist ini')
    }
  }

  async verifyPlaylistAccess (playlistId, userId) {
    const query = {
      text: `SELECT playlists.id
             FROM playlists
             INNER JOIN users ON playlists.owner = users.id  
             LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
             WHERE (playlists.owner = $1 OR collaborations.user_id = $1) AND 
             playlists.id = $2`,
      values: [userId, playlistId]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0]) {
      throw new AuthorizationError('Anda bukan pemilik/collaborator playlist ini')
    }
  }

  async verifyPlaylistIsExist (playlistId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan')
    }
  }
}

module.exports = PlaylistsService
