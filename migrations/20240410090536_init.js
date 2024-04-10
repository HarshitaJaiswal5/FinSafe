/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Cards',(table)=>{
        table.increments('id'),primary()
        table.integer('Account_Number').notNullable()
        table.string('Account_holder_name').notNullable()
        table.enum("Card_Type",["debit","credit"]).notNullable()
        table.date('Valid_Thru')
        table.string('Transaction')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Cards')
  
};
