import { DateTime } from 'luxon';
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import { nanoid } from 'nanoid';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async sendConfirmationEmail() {
    const token = nanoid();
    const confirmEmailUrl = `${Env.get('APP_URL')}/verify-email/${this.id}/${token}`
    Mail.send((message) => {
      message
        .from('confirmemail@adonisgram.com')
        .to(this.email)
        .subject('Please confirm your email')
        .htmlView('emails/confirmation', { name: this.name, confirmEmailUrl })
    })
  }
}
