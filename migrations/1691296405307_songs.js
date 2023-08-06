exports.up = pgm => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(21)',
      primaryKey: true
    },
    title: {
      type: 'varchar(35)',
      notNull: true
    },
    year: {
      type: 'integer',
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
    album_id: {
      type: 'varchar(22)',
      references: '"albums"',
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
  pgm.createIndex('songs', 'album_id')
}

exports.down = pgm => {
  pgm.dropTable('songs', {
    options: {
      ifExists: true
    }
  })
}
