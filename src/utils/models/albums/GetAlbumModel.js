class GetAlbumModel {
  constructor ({ id, name, year }) {
    this.id = id
    this.name = name
    this.year = year
  }

  getModel () {
    return {
      id: this.id, name: this.name, year: this.year
    }
  }
}

module.exports = GetAlbumModel
