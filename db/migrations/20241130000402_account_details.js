exports.up = function(knex) {
    return knex.schema.createTable('account_details', (table) => {
      table.increments('accountNo').primary();
      table.string('account_type').notNullable().defaultTo('savings');
      table.integer('balance').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('account_details');
  };
  