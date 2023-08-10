const { nanoid } = require('nanoid')

class CollaborationModel {
  constructor ({ playlistId, userId }) {
    this.id = `collaborations-${nanoid(10)}`
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
