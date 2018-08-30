exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('answer_comments', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('answer_id').notNullable()
      table.integer('body').notNullable()
      table.timestamps()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('answer_comments')
  ])
};
