import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';


export default class SignUpController {
    public async index({ request }: HttpContextContract) {
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
        console.log(req);
        return request.all();
    }
}
