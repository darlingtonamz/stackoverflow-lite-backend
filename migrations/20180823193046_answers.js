'use strict';
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('answers', (table) => {
      table.increments();
      table.integer('user_id').notNullable();
      table.integer('question_id').notNullable();
      table.text('body');
      table.integer('votes');

      table.foreign('user_id')
        .references('users.id')
        .onDelete('cascade');

      table.foreign('question_id')
        .references('questions.id')
        .onDelete('cascade');

      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('answers'),
  ]);
};
