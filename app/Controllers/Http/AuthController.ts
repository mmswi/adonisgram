import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';


export default class AuthController {
    public async signup({ request, response, auth }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                name: schema.string(),
                username: schema.string(),
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
        user.username = req.username;
        user.email = req.email;
        user.password = req.password;

        await user.save();

        await auth.attempt(req.email, req.password);

        // send verification email
        await auth.user?.sendConfirmationEmail();

        return response.redirect('/');
    }

    public async login({ request, response, auth }: HttpContextContract) {
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

    public async logout({ auth, response }: HttpContextContract) {

        await auth.logout();

        return response.redirect('/');
    }
}
