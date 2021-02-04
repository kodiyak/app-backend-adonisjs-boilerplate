import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable('users', (table) => {
      table
        .integer('file_avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  public async down() {}
}
