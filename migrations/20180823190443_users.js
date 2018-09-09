'use strict';
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('fname').notNullable();
      table.string('lname').notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.jsonb('stats');
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
  ]);
};
