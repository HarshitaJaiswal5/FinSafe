exports.up = function(knex) {
    return knex.schema.createTable('transaction_details', (table) => {
      table.increments('trans_id').primary();
      table.integer('accountNo').unsigned().notNullable()
        .references('accountNo').inTable('account_details')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.enu('trans_type', ['deposit', 'withdrawal', 'transfer']).notNullable();
      table.decimal('amount', 15, 2).notNullable();
      table.string('description', 255); 
      table.timestamps(true, true);
      table.index('accountNo'); 
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transaction_details');
};
