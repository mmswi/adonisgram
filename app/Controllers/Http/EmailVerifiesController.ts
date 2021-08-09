import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class EmailVerifiesController {
    public async index({ response, auth }: HttpContextContract) {
        await auth.user?.sendConfirmationEmail();

        return response.redirect().back();
    }

    public async verify({ response, params }: HttpContextContract) {
        const userId = params.userid;
        const token = params.token;
        const user = User.findOrFail(userId);
        // user.email_verify_at = new Date()
        return response.send('WORKEAZA' + user + token)
    }
}
