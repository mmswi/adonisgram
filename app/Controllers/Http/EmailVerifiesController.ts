import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class EmailVerifiesController {
    public async index({response, auth}: HttpContextContract) {
        await auth.user?.sendConfirmationEmail();

        response.redirect().back();
    }
}
