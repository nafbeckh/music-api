const { nanoid } = require('nanoid')

class AlbumLikeModel {
  constructor ({ userId, albumId }) {
    this.id = `album_like-${nanoid(16)}`
    this.userId = userId
    this.albumId = albumId
  }

  getModel () {
    return [
      this.id,
      this.userId,
      this.albumId
    ]
  }
}

module.exports = AlbumLikeModel
