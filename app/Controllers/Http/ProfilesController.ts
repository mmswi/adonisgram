import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Application from '@ioc:Adonis/Core/Application'
// import { UserFactory } from 'Database/factories';


export default class ProfilesController {
    public async index({ view, params, auth }: HttpContextContract) {
        const username = params.username
        try {
            const user = await User.findByOrFail('username', username);
            // TODO - uncomment below to ceate mock users in db
            // await UserFactory.with('posts', 5).createMany(10);

            await user.load('posts')
            await auth?.user?.load('following')
            await user.load('following')

            const userPostsDesc = user.posts.reverse();
            const authUserFollowedIds = auth?.user?.following.map(following => following.followingId);
            const isAuthUserFollowingCurrentUser = authUserFollowedIds?.includes(user.id);
            const followersCount = await user.getFollowersCount();
            const followingCount = user.following?.length || 0;

            return view.render('user/profile', { user, userPostsDesc, isAuthUserFollowingCurrentUser, followersCount, followingCount })
        } catch (e) {
            return view.render('errors/not-found')
        }
    }

    public async edit({ view }: HttpContextContract) {
        return view.render('user/edit')
    }

    public async update({ auth, request, response }: HttpContextContract) {
        const user = auth.user;
        if (!user) {
            return 'User not found';
        }

        const avatar = request.file('avatar');

        if (avatar) {
            const imageName = `${new Date().getTime()}.${avatar.extname}`;
            await avatar.move(Application.publicPath('uploads'), {
                name: imageName
            })
            user.avatar = `/uploads/${imageName}`;
        }

        user.details = request.input('details');
        await user.save();

        return response.redirect(`/${user.username}`);
    }
}
