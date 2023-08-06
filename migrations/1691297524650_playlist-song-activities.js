/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlist_songs_activities', {
    id: {
      type: 'varchar(30)',
      primaryKey: true
    },
    playlist_id: {
      type: 'varchar(25)',
      references: '"playlists"',
      onDelete: 'cascade',
      notNull: true
    },
    song_id: {
      type: 'varchar(22)',
      notNull: true
    },
    user_id: {
      type: 'varchar(25)',
      notNull: true
    },
    time: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createIndex('playlist_songs_activities', 'playlist_id')
}

exports.down = pgm => {
  pgm.dropTable('playlist_songs_activities', {
    options: {
      ifExists: true
    }
  })
}
