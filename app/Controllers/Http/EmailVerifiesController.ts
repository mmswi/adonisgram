import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class EmailVerifiesController {
    public async index({ response, auth }: HttpContextContract) {
        await auth.user?.sendConfirmationEmail();

        return response.redirect().back();
    }

    public async verify({ request, params }: HttpContextContract) {
        if (request.hasValidSignature()) {
            const user = await User.findByOrFail('email', params.email);
            user.email_verified_at = DateTime.local();
            user.save();

            return 'Your email has been verified! Return to the homepage';
        }

        return 'Signature is missing or URL was tampered.';
    }
}
