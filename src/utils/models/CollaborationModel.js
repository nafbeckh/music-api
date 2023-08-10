const { nanoid } = require('nanoid')

class CollaborationModel {
  constructor ({ playlistId, userId }) {
    this.id = `collabs-${nanoid(16)}`
    this.playlistId = playlistId
    this.userId = userId
  }

  getModel () {
    return [
      this.id,
      this.playlistId,
      this.userId
    ]
  }
}

module.exports = CollaborationModel
