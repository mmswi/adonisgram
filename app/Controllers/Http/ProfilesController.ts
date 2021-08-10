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

    public async update({ auth, request, response }: HttpContextContract) {
        const user = auth.user;
        if (!user) {
            return 'User not found';
        }

        const avatar = request.file('avatar');

        if (!avatar) {
            return 'Please upload a file'
        }

        const imageName = `${new Date().getTime()}.${avatar.extname}`;
        await avatar.move(Application.publicPath('uploads'), {
            name: imageName
        })

        user.details = request.only['details'];
        user.avatar = `/uploads/${imageName}`;
        user.save();

        return response.redirect(`/${user.username}`);
    }
}
