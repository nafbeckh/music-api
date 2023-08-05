class PutSongModel {
  constructor (id, { title, year, performer, genre, duration, albumId }) {
    this.title = title
    this.year = year
    this.performer = performer
    this.genre = genre
    this.duration = duration
    this.albumId = albumId
    this.updateAt = new Date().toISOString()
    this.id = id
  }

  getUpdateModel () {
    return [this.title, this.year, this.performer,
      this.genre, this.duration, this.albumId, this.updateAt, this.id]
  }
}

module.exports = PutSongModel
