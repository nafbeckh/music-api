const { nanoid } = require('nanoid')

class PostSongModel {
  constructor ({ title, year, performer, genre, duration, albumId }) {
    this.id = `song-${nanoid(16)}`
    this.title = title
    this.year = year
    this.performer = performer
    this.genre = genre
    this.duration = duration
    this.albumId = albumId
  }

  getInsertModel () {
    return [this.id, this.title, this.year, this.genre,
      this.performer, this.duration, this.albumId]
  }
}

module.exports = PostSongModel
