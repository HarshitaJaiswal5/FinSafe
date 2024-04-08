/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users',(table)=>{
        table.increments('id').primary()
        table.string('Fullname').notNullable()
        table.string('Email').notNullable().unique()
        table.integer('DOB').notNullable()
        table.integer('Permanent_Address').notNullable()
        table.timestamps(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Users')
  
};
