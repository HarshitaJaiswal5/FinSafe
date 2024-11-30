exports.up = function(knex) {
    return knex.schema.createTable('person', (table) => {
      table.increments('person_id').primary();   
      table.integer('branch_id').notNullable().unsigned()
      .references('branch_id').inTable('branch_details')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .index();    
      table.string('name', 100).notNullable();
      table.date('DOB').notNullable();
      table.string('phoneNo', 15).unique().notNullable(); 
      table.string('address', 255).notNullable();
      table.enu('role', ['customer_only', 'employee_only', 'customer_employee']).notNullable().defaultTo('customer_only');
      table.string('password',60).notNullable();
      table.timestamps(true, true);   
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('person');
  };
  