const { nanoid } = require('nanoid')

class PostAlbumModel {
  constructor ({ name, year }) {
    this.id = `album-${nanoid(16)}`
    this.name = name
    this.year = year
  }

  getInsertModel () {
    return [this.id, this.name, this.year]
  }
}

module.exports = PostAlbumModel
