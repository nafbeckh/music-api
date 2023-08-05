class GetSongModel {
  constructor ({ id, title, year, performer, genre, duration, albumId }) {
    this.id = id
    this.name = title
    this.year = year
    this.performer = performer
    this.genre = genre
    this.duration = duration
    this.albumId = albumId
  }

  getAllModel () {
    return {
      id: this.id,
      title: this.title,
      year: this.year,
      performer: this.performer,
      genre: this.genre,
      duration: this.duration,
      albumId: this.albumId
    }
  }
}

module.exports = GetSongModel
