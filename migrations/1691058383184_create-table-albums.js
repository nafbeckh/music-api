/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('albums', {
    id: {
      type: 'varchar(22)',
      primaryKey: true
    },
    name: {
      type: 'varchar(35)',
      notNull: true
    },
    year: {
      type: 'integer',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updateAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createTable('songs', {
    id: {
      type: 'varchar(21)',
      primaryKey: true
    },
    title: {
      type: 'varchar(35)',
      notNull: true
    },
    performer: {
      type: 'varchar(30)',
      notNull: true
    },
    genre: {
      type: 'varchar(16)',
      notNull: true
    },
    duration: {
      type: 'integer'
    },
    albumId: {
      type: 'VARCHAR(22)',
      notNull: true,
      references: '"albums"',
      onDelete: 'cascade'
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updateAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('songs', 'albumId')
}

exports.down = pgm => {
  pgm.dropTable('albums').ifExists(true).cascade(true)
  pgm.dropTable('songs').ifExists(true)
}
