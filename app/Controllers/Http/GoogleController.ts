import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class GoogleController {
    public async redirect({ ally }: HttpContextContract) {
        await ally.use('google').redirect();
    }

    public async callback({ ally, auth, response }: HttpContextContract) {
        const google = ally.use('google')

        /**
         * User has explicitly denied the login request
         */
        if (google.accessDenied()) {
            return 'Access was denied'
        }

        /**
         * Unable to verify the CSRF state
         */
        if (google.stateMisMatch()) {
            return 'Request expired. Retry again'
        }

        /**
         * There was an unknown error during the redirect
         */
        if (google.hasError()) {
            return google.getError()
        }

        /**
         * Finally, access the user
         */
        const userSocialDetails = await this.getSocialDetails(google)
        const user = await this.getUserOrCreate(userSocialDetails);

        await auth.login(user);

        return response.redirect('/');
    }

    private async getSocialDetails(socialAlly: any): Promise<{ email: string; token: any; name: string; username: string; avatarUrl: string; isEmailVerified: boolean | null; }> {
        const user = await socialAlly.user()

        return {
            email: user.email,
            token: user.token,
            name: user.name,
            username: this.createUserName(user.id, user.nickName),
            avatarUrl: user.avatarUrl,
            isEmailVerified: user.emailVerificationState === 'verified'
        }
    }

    private async getUserOrCreate(userDetails: { email: string; token: any; name: string; username: string; avatarUrl: string; isEmailVerified: boolean | null; }): Promise<any> {
        const user = await User.firstOrCreate({
            email: userDetails.email,
        }, {
            access_token: userDetails.token.token,
            name: userDetails.name,
            username: userDetails.username,
            avatar: userDetails.avatarUrl,
            email_verified_at: userDetails.isEmailVerified ? DateTime.local() : null
        })

        return user;
    }

    private createUserName(id: string, nickName: string): string {
        const newId = id?.substr(0,4) + id?.substr(id?.length - 4);
        const newNickName = nickName?.replace(' ', '');
        return `${newNickName}_${newId}`
    }
}
