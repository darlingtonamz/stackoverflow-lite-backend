exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.string('accepted_answer_id').nullable().unique()

      table.foreign('user_id')
        .references('users.id')
        .onDelete('cascade')

      table.timestamps()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('questions')
  ])
};
