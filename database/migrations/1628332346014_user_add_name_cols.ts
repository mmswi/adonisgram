import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAddNameCols extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
