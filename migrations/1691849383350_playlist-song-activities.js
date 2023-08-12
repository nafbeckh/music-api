/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'varchar(35)',
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
      references: '"songs"',
      onDelete: 'cascade',
      notNull: true
    },
    user_id: {
      type: 'varchar(25)',
      references: '"users"',
      onDelete: 'cascade',
      notNull: true
    },
    action: {
      type: 'varchar(16)',
      notNull: true
    },
    time: {
      type: 'timestamp',
      notNull: true
    }
  })

  pgm.createIndex('playlist_song_activities', 'playlist_id')
  pgm.createIndex('playlist_song_activities', 'song_id')
  pgm.createIndex('playlist_song_activities', 'user_id')
}

exports.down = pgm => {
  pgm.dropTable('playlist_song_activities')
}
