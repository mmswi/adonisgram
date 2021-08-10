import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Following from 'App/Models/Following';

export default class FollowsController {
    public async store({ params, response, auth }: HttpContextContract) {
        const authUser = auth.user;
        if (!authUser) {
            return 'Cannnot perform action';
        }

        const userIdToFollow = params.userId;
        console.log('following ', userIdToFollow)
        const follow = new Following;
        
        follow.userId = authUser.id;
        follow.followingId = userIdToFollow;
        await follow.save();

        return response.redirect().back()
    }

    public async destroy({ params, response, auth }: HttpContextContract) {
        const authUser = auth.user;
        if (!authUser) {
            return 'Cannnot perform action';
        }

        const userIdToUnfollow = params.userId;
        const follow = Following.query().where('user_id', authUser.id).where('following_id', userIdToUnfollow);
        
        await follow.delete();

        return response.redirect().back()
    }
}
