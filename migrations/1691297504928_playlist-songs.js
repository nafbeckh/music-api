/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlist_songs', {
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
      references: '"songs"',
      onDelete: 'cascade',
      notNull: true
    }
  })

  pgm.createIndex('playlist_songs', 'playlist_id')
  pgm.createIndex('playlist_songs', 'song_id')
}

exports.down = pgm => {
  pgm.dropTable('playlists_songs', {
    options: {
      ifExists: true
    }
  })
}
