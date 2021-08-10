import { DateTime } from 'luxon';
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import Route from '@ioc:Adonis/Core/Route';
import Post from './Post';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public avatar: string

  @column()
  public details: string

  @column()
  public password: string

  @column.dateTime()
  public email_verified_at: DateTime;

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

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  public async sendConfirmationEmail() {
    // signed url solves the opening of the new link in an incognito browser
    const confirmEmailUrl = Env.get('APP_URL') + Route.makeSignedUrl('verifyEmail', { 
      params: { email: this.email },
      expiresIn: '30m'
    });

    Mail.send((message) => {
      message
        .from('confirmemail@adonisgram.com')
        .to(this.email)
        .subject('Please confirm your email')
        .htmlView('emails/confirmation', { name: this.name, confirmEmailUrl })
    })
  }
}
