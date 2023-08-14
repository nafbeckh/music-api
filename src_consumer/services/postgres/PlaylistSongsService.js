const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')

class PlaylistSongsService {
  constructor () {
    this._pool = new Pool()
  }

  async getSongsFromPlaylistId (playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
             FROM playlists
             INNER JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
             INNER JOIN songs ON songs.id = playlist_songs.song_id
             WHERE playlists.id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    if (!result.rows) {
      throw new InvariantError('Gagal mengambil lagu-lagu dari playlist')
    }

    return result.rows
  }
}

module.exports = PlaylistSongsService
