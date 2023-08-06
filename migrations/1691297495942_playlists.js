/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlists', {
    id: {
      type: 'varchar(25)',
      primaryKey: true
    },
    name: {
      type: 'varchar(35)',
      notNull: true
    },
    owner: {
      type: 'varchar(25)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createIndex('playlists', 'owner')
}

exports.down = pgm => {
  pgm.dropTable('playlists', {
    options: {
      ifExists: true
    }
  })
}
