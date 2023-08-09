const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const PlaylistSongModel = require('../../utils/models/PlaylistSongModel')

class PlaylistSongsService {
  constructor (playlistsService) {
    this._pool = new Pool()
    this._playlistsService = playlistsService
  }

  async addSongToPlaylist (payload) {
    const { id, songId, userId } = payload
    await this._playlistsService.verifyPlaylistIsExist(id)
    await this._playlistsService.verifyPlaylistAccess(id, userId)

    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3) RETURNING id',
      values: new PlaylistSongModel({ id, songId }).getModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist')
    }
  }

  async getSongsFromPlaylistId (playlistId, userId) {
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId)
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
             FROM playlists
             INNER JOIN playlist_songs as p_songs ON p_songs.playlist_id = playlists.id
             INNER JOIN songs ON songs.id = p_songs.song_id
             WHERE playlists.id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    if (!result.rows) {
      throw new InvariantError('Lagu-lagu dari playlist gagal ditampilkan')
    }

    return result.rows
  }

  async deleteSongFromPlaylist (playlistId, songId, userId) {
    await this._playlistsService.verifyPlaylistIsExist(playlistId)
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId)

    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus dari playlist. Id tidak ditemukan')
    }
  }
}

module.exports = PlaylistSongsService
