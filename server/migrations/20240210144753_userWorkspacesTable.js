exports.up = async (knex) => {
    await knex.schema.createTable('workspaces', (table) => {
      table.increments('id').primary()
      table.integer('userId').unsigned().notNullable()
      table.string('name', 50).notNullable()

      table.foreign('userId').references('users.id')
    })
  }
  
  exports.down = async (knex) => { 
    await knex.schema.dropTable('workspaces')
  }
  