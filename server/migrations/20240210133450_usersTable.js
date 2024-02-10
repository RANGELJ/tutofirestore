exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('firebaseUid', 40).notNullable()
  })
}

exports.down = async (knex) => { 
  await knex.schema.dropTable('users')
}
