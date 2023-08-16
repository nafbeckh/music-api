class GetAlbumModel {
  constructor ({ id, name, year, cover }) {
    this.id = id
    this.name = name
    this.year = year
    this.coverUrl = cover
  }

  getModel () {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      coverUrl: this.coverUrl
    }
  }
}

module.exports = GetAlbumModel
