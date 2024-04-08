/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Branch',(table)=>{
        table.increments('id').primary()
        table.string('Branch_name').notNullable()
        table.string('Branch_code').notNullable()
        table.string('Branch_Adress').notNullable()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Branch')
  
};
