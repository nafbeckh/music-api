const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
// const NotFoundError = require('../../exceptions/NotFoundError')
const { PostUserModel } = require('../../utils/models/users')

class UsersService {
  constructor () {
    this._pool = new Pool()
  }

  async addUser (payload) {
    await this.checkUsername(payload)

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: new PostUserModel(payload).getInsertModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('User gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async checkUsername ({ username }) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan')
    }
  }
}

module.exports = UsersService
