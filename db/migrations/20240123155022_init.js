
exports.up = function(knex) {
    return knex.schema
    .alterTable('note_denominations', function(t){
        t.integer('account_no').unsigned();
        t.foreign('account_no').references('account_no').inTable('account_holder_details');})
    .alterTable('transaction_details', function(t){
        t.integer('account_no').unsigned();
        t.foreign('account_no').references('account_no').inTable('account_holder_details');
    
    
    
    
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .alterTable('note_denominations', function(t){
        t.dropForeign('account_no');
        t.dropColumn('account_no');})
    .alterTable('transaction_details', function(t){
        t.dropForeign('account_no');
        t.dropColumn('account_no'); });}
        
