/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('collaboration', {
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
      type: 'varchar(20)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade'
    }
  })

  pgm.createIndex('collaboration', 'playlist_id')
  pgm.createIndex('collaboration', 'user_id')
}

exports.down = pgm => {
  pgm.dropTable('collaboration', {
    options: {
      ifExists: true
    }
  })
}
