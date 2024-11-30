exports.up = function(knex) {
    return knex.schema.createTable('employee', (table) => {
      table.increments('eid').primary();
      table.integer('person_id').unsigned().notNullable().unique()
        .references('person_id').inTable('person')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('email',255).notNullable().unique();
      table.date('DOJ').notNullable();
      table.string('department').notNullable();
      table.decimal('salary', 12, 2).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('employee');
  };
  