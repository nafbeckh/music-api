class PutAlbumModel {
  constructor (id, { name, year }) {
    this.name = name
    this.year = year
    this.updatedAt = new Date().toISOString()
    this.id = id
  }

  getUpdateModel () {
    return [this.name, this.year, this.updatedAt, this.id]
  }
}

module.exports = PutAlbumModel
