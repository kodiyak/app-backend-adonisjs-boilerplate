import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AppConfigs extends BaseSchema {
  protected tableName = 'app_configs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('key')
      table.string('title')
      table.string('type')
      table.text('value').nullable()
      table.text('description').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
