class GetSongModel {
  constructor ({ id, title, year, genre, performer, duration, album_id: albumId }) {
    this.id = id
    this.title = title
    this.year = year
    this.performer = performer
    this.genre = genre
    this.duration = duration
    this.albumId = albumId
  }

  getModel () {
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
