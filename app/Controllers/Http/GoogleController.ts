import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class GoogleController {
    public async redirect({ ally }: HttpContextContract) {
        await ally.use('google').redirect();
    }

    public async callback({ ally }: HttpContextContract) {
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
        
        return user;
    }

    private async getSocialDetails(socialAlly: any) {
        const user = await socialAlly.user()

        return {
            email: user.email,
            token: user.token,
        }
    }

    private async getUserOrCreate(userDetails: {email: string, token: any}) {
        const user = await User.findBy('email', userDetails.email);

        if (!user) {
            // TODO: create user
        }

        return user;
    }
}
