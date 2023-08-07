const { nanoid } = require('nanoid')

class PostUserModel {
  constructor (data, hashedPassword) {
    this.id = `user-${nanoid(16)}`
    this.username = data.username
    this.password = hashedPassword
    this.fullname = data.fullname
  }

  getInsertModel () {
    return [this.id, this.username, this.password, this.fullname]
  }
}

module.exports = PostUserModel
