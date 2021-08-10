import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class ProfilesController {
    public async index({ view, params }: HttpContextContract) {
        const username = params.username
        try {
            await User.findByOrFail('username', username);
            return view.render('user/profile')
        } catch (e) {
            return view.render('errors/not-found')
        }
    }

    public async edit({ view }: HttpContextContract) {
        return view.render('user/edit')        
    }
}
