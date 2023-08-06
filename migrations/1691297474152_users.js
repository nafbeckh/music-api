/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'varchar(20)',
      primaryKey: true
    },
    username: {
      type: 'varchar(20)',
      notNull: true,
      unique: true
    },
    password: {
      type: 'varchar',
      notNull: true
    },
    fullname: {
      type: 'varchar(50)',
      notNull: true
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
}

exports.down = pgm => {
  pgm.dropTable('users', {
    options: {
      ifExists: true
    }
  })
}
