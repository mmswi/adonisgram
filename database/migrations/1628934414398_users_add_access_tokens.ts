import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersAddAccessTokens extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('accessToken', 255).nullable().unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
