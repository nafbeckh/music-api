/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'varchar(35)',
      primaryKey: true
    },
    user_id: {
      type: 'varchar(25)',
      references: '"users"',
      onDelete: 'cascade',
      notNull: true
    },
    album_id: {
      type: 'varchar(25)',
      references: '"albums"',
      onDelete: 'cascade',
      notNull: true
    }
  })

  pgm.addConstraint('user_album_likes', 'unique_user_id_and_album_id', 'UNIQUE(user_id, album_id)')

  pgm.createIndex('user_album_likes', 'user_id')
  pgm.createIndex('user_album_likes', 'album_id')
}

exports.down = pgm => {
  pgm.dropTable('user_album_likes')
}
