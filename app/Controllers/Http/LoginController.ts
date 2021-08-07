import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class LoginController {
    public async index({ request, response }: HttpContextContract) {
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

        const user = await User.findByOrFail('email', req.email);
        return user;
    }
}
