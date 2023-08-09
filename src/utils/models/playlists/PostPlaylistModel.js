const { nanoid } = require('nanoid')

class PostPlaylistModel {
  constructor ({ name, owner }) {
    this.id = `playlist-${nanoid(16)}`
    this.name = name
    this.owner = owner
  }

  getInsertModel () {
    return [this.id, this.name, this.owner]
  }
}

module.exports = PostPlaylistModel
