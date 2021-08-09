import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {
    public async index({ view }: HttpContextContract) {
        return view.render('user/profile')
    }
}
