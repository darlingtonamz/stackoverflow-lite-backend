'use strict';
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('answer_votes', (table) => {
      table.increments();
      table.integer('user_id').notNullable();
      table.integer('answer_id').notNullable();
      table.integer('value').notNullable();
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('answer_votes'),
  ]);
};
