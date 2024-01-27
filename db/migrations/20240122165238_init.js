
exports.up = function(knex) { 
    return knex.schema.createTable('note_denominations', t => {
        
        t.integer('2000rs notes').nullable();
        t.integer('1000rs notes').nullable();
        t.integer('500rs notes').nullable();
        t.integer('200rs notes').nullable();
        t.integer('Balance').nullable();        
        t.timestamps(true,true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('note_denominations');  
  
};
// to add column in table account id with reference