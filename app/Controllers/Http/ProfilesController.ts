import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Application from '@ioc:Adonis/Core/Application'


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

    public async update({ auth, request }: HttpContextContract) {
        const user = auth.user;
        const avatar = request.file('avatar');
        
        if (!avatar) {
            return 'Please upload a file'
        }

        // puts avatar in temp file, before actually saving to db
        await avatar.move(Application.tmpPath('uploads'))

        // user.details = request.only['details'];
    }
}
