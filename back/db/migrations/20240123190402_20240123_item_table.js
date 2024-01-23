/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary;
        table.integer('item_userid');
        table.foreign('item_userid').references('users.id');
        table.string('item_name')
        table.string('item_description')
        table.integer('item_quantity')
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('items', table => {
        table.dropForeign('item_userid')
      })
      .then(function(){
        return knex.schema.dropTableIfExists('items')
      })
    };