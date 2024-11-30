exports.up = function(knex) {
    return knex.schema.createTable('customer', (table) => {
      table.increments('customer_id').primary();
      table.integer('person_id').unsigned().notNullable()
        .references('person_id').inTable('person')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('membership_type').notNullable().default('regular');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customer');
  };
  