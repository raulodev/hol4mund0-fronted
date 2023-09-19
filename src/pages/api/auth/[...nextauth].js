import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter";
import { serverApi } from "@/services/api-client"


export const authOptions = {

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET
        })

    ],

    pages: {
        signIn: '/login',
        error: '/401'
    },

    session: {
        maxAge: 30 * 24 * 60 * 60, // En el backend está configurado para 30 días
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (account.provider === "github") {

                const formData = new FormData();
                formData.append('email', user.email);
                formData.append('first_name', user.name);
                formData.append('description', profile.bio);
                formData.append('username', profile.login);
                formData.append('provider', account.provider);

                try {
                    const req = await serverApi.post("/auth/register/", formData)
                    const { token } = req.data
                    user.accessToken = token
                    return true
                } catch (error) {
                    console.log(error)
                    return false
                }
            } else if (account.provider === "twitter") {

                const formData = new FormData();
                formData.append('email', user.email);
                formData.append('first_name', user.name);
                formData.append('description', profile.description);
                formData.append('username', profile.screen_name);
                formData.append('provider', account.provider);

                try {
                    const req = await serverApi.post("/auth/register/", formData)
                    const { token } = req.data
                    user.accessToken = token
                    return true
                } catch (error) {
                    console.log(error)
                    return false
                }

            }
            return false
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, user, token }) {
            session.accessToken = token.accessToken
            return session
        },


    }
}
export default NextAuth(authOptions)