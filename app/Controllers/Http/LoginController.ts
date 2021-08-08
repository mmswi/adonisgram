import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class LoginController {
    public async index({ request, response, auth }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                email: schema.string({}, [
                    rules.email()
                ]),
                password: schema.string()
            }),
            messages: {
                required: 'Please provide a value for {{ field }}',
            }
        })

        const email = req.email;
        const password = req.password;

        await auth.attempt(email, password);

        return response.redirect('/profile');
    }
}
