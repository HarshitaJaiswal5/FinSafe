/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users_1',(table)=>{
        table.increments('id').primary()
        table.string('Fullname').notNullable()
        table.string('Email').notNullable().unique()
        table.integer('DOB').notNullable()
        table.string('Permanent_Address').notNullable()
        table.timestamps(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Users_1')
  
};
