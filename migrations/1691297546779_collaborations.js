/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('collaborations', {
    id: {
      type: 'varchar(25)',
      primaryKey: true
    },
    playlist_id: {
      type: 'varchar(25)',
      notNull: true,
      references: '"playlists"',
      onDelete: 'cascade'
    },
    user_id: {
      type: 'varchar(25)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade'
    }
  })

  pgm.createIndex('collaborations', 'playlist_id')
  pgm.createIndex('collaborations', 'user_id')
}

exports.down = pgm => {
  pgm.dropTable('collaborations')
}
