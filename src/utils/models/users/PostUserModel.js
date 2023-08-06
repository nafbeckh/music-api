const { nanoid } = require('nanoid')

class PostUserModel {
  constructor ({ username, password, fullname }) {
    this.id = `user-${nanoid(16)}`
    this.username = username
    this.password = password
    this.fullname = fullname
  }

  getInsertModel () {
    return [this.id, this.username, this.password, this.fullname]
  }
}

module.exports = PostUserModel
