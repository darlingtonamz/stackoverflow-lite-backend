// Update with your config settings.
// Only used for handling migrations

const {DB_USER, DB_PASSWORD, DB_DATABASE } = process.env
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: DB_DATABASE,
      user:     DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'stackoverflow_lite_test',
      user:     'postgres',
      password: DB_PASSWORD || 'hisgrace'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: DB_DATABASE,
      user:     DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
