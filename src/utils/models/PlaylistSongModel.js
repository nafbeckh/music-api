const { nanoid } = require('nanoid')

class PlaylistSongModel {
  constructor ({ id, songId }) {
    this.id = `playlist_song-${nanoid(16)}`
    this.playlistId = id
    this.songId = songId
  }

  getModel () {
    return [
      this.id,
      this.playlistId,
      this.songId
    ]
  }
}

module.exports = PlaylistSongModel
