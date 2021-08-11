import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class HomeController {
    public async index({ view, auth }: HttpContextContract) {
        await auth.user?.load('following');
        
        const followingIds = auth.user?.following.map(followed => followed.followingId);
        console.log('followingIds: ', followingIds)
        const folowedUsersIds = followingIds || [];
        const posts = await Post.query().whereIn('userId', folowedUsersIds).preload('user').orderBy('created_at', 'desc');

        return view.render('welcome', { posts });
    }
}
