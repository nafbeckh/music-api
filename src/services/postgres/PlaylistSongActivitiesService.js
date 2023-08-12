const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')

class PlaylistSongActivitiesService {
  constructor () {
    this._pool = new Pool()
  }

  async addPlaylistActivity (playlistId, songId, userId, action) {
    const id = `activity-${nanoid(16)}`
    const time = new Date().toISOString()

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Gagal menyimpan Activity')
    }
  }

  async getPlaylistActivities (playlistId) {
    const query = {
      text: `SELECT users.username, songs.title, activities.action, activities.time
             FROM playlist_song_activities AS activities
             INNER JOIN users ON users.id = activities.user_id
             INNER JOIN songs ON songs.id = activities.song_id
             WHERE activities.playlist_id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    if (!result.rows) {
      throw new InvariantError('Playlist Activities gagal ditampilkan')
    }

    return result.rows
  }
}

module.exports = PlaylistSongActivitiesService
