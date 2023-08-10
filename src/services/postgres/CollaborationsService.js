const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const CollaborationModel = require('../../utils/models/CollaborationModel')

class CollaborationsService {
  constructor (usersService) {
    this._pool = new Pool()
    this._usersService = usersService
  }

  async addCollaboration ({ playlistId, userId }) {
    await this._usersService.verifyUserIsExist(userId)

    const query = {
      text: 'INSERT INTO collaborations VALUES ($1, $2, $3) RETURNING id',
      values: new CollaborationModel({ playlistId, userId }).getModel()
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Collaboration gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async deleteCollaboration ({ playlistId, userId }) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Collaboration gagal dihapus')
    }
  }
}

module.exports = CollaborationsService
