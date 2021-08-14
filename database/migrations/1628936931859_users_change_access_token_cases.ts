import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersChangeAccessTokenCases extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.renameColumn('accessToken', 'access_token')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
