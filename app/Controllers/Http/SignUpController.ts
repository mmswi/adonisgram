import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SignUpController {
    public async index({request}: HttpContextContract) {
        return request.all();
    }
}
