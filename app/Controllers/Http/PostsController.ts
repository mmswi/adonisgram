import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = auth.user;
    if (!user) {
      return 'User not found';
    }

    const req = await request.validate({
      schema: schema.create({
        caption: schema.string({}),
        picture: schema.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg', '']
        })
      }),
      messages: {
        required: 'The {{ field }} is required to create a new post',
      }
    })

    const picture = req.picture;
    const imageName = `${new Date().getTime()}.${picture.extname}`;
    await picture.move(Application.publicPath('uploads'), {
      name: imageName
    })

    const post = new Post();

    post.image = `/uploads/${imageName}`;
    post.caption = req.caption;
    post.userId = user.id;
    
    await post.save();

    return response.redirect(`/${user.username}`);
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
