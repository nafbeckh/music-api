const { nanoid } = require('nanoid')

class PostAlbumModel {
  constructor ({ name, year }) {
    this.id = `album-${nanoid(16)}`
    this.name = name
    this.year = year
    this.createdAt = new Date().toISOString()
    this.updatedAt = this.createdAt
  }

  getInsertModel () {
    return [this.id, this.name, this.year, this.createdAt, this.updatedAt]
  }
}

module.exports = PostAlbumModel
