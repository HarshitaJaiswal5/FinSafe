exports.up = function(knex) {
    return knex.schema.createTable('customer_accounts', (table) => {
      table.increments('id').primary();
      table.integer('customer_id').unsigned().notNullable()
        .references('customer_id').inTable('customer')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('accountNo').unsigned().notNullable()
        .references('accountNo').inTable('account_details')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customer_accounts');
  };
  