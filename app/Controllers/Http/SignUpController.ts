import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';


export default class SignUpController {
    public async index({ request, response }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string({}, [
                    rules.email(),
                ]),
                password: schema.string({}, [
                    rules.confirmed('password_confirm')
                ]),
                'password_confirm': schema.string()
            }),
            messages: {
                required: 'The {{ field }} is required to create a new account',
            }
        })
        
        const user = new User();
        user.name = req.name;
        user.email = req.email;
        user.password = req.password;
        user.save();
        return response.redirect('/');
    }
}
