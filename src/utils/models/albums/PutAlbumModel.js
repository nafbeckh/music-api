class PutAlbumModel {
  constructor (id, { name, year }) {
    this.name = name
    this.year = year
    this.id = id
  }

  getUpdateModel () {
    return [this.name, this.year, this.id]
  }
}

module.exports = PutAlbumModel
