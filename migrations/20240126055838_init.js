
exports.up = function(knex) {
    return knex.schema.alterTable('transaction_details', function (table){
        table.string('transaction_type').notNullable();
      })
  
};


exports.down = function(knex) {
    return knex.schema.alterTable('transaction_details', t => {
        t.dropColumn('transaction_type')
    })
  
};
