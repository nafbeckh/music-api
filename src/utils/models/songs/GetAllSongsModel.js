class GetAllSongsModel {
  constructor ({ rows }) {
    this.songs = rows
  }

  getAllModel () {
    return this.songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer
    }))
  }
}

module.exports = GetAllSongsModel
