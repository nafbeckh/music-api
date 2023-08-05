class PutSongModel {
  constructor (id, { title, year, performer, genre, duration, albumId }) {
    this.title = title
    this.year = year
    this.performer = performer
    this.genre = genre
    this.duration = duration
    this.albumId = albumId
    this.id = id
  }

  getInsertModel () {
    return [this.title, this.year, this.genre,
      this.performer, this.duration, this.albumId, this.id]
  }
}

module.exports = PutSongModel
