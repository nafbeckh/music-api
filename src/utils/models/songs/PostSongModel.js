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
    this.createdAt = new Date().toISOString()
    this.updatedAt = this.createdAt
  }

  getInsertModel () {
    return [this.id, this.title, this.year, this.performer,
      this.genre, this.duration, this.albumId, this.createdAt, this.createdAt]
  }
}

module.exports = PostSongModel
