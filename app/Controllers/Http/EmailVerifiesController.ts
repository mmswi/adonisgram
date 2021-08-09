import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class EmailVerifiesController {
    public async index({ response, auth, session }: HttpContextContract) {
        await auth.user?.sendConfirmationEmail(session);

        return response.redirect().back();
    }

    public async verify({ response, params, session }: HttpContextContract) {
        const userId = params.userid;
        const token = params.token;
        const user = await User.findOrFail(userId);
        const sessionToken = session.get(`token-${user.id}`);

        if (sessionToken !== token) {
            return response.status(403);
        }

        user.email_verified_at = DateTime.local();
        user.save();
        session.forget(`token-${user.id}`);
        
        return response.redirect('/profile');
    }
}
