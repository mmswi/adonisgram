import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';

export default class EmailVerifiesController {
    public async index({response, auth}: HttpContextContract) {
        const user = auth.user || {email: '', name: ''};
        await Mail.send((message) => {
            message
                .from('confirmemail@adonisgram.com')
                .to(user.email)
                .subject('Please confirm your email')
                .htmlView('emails/confirmation', { name: user.name })
        })

        response.redirect().back();
    }
}
