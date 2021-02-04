import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.string('uuid')
      table.string('description')
      table.string('mime_type')
      table.string('path')
      table.string('filename')
      table.string('original_filename')
      table.bigInteger('size')
      table.string('extension')
      table.string('url_external').nullable()
      table.string('url_webview').nullable()
      table
        .integer('folder_id')
        .unsigned()
        .references('id')
        .inTable('folders')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
