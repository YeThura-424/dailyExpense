import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  providers: [
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID || 'GITHUB_CLIENT_ID',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'GITHUB_CLIENT_SECRET'
    }),
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET'
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.access_token) {
        // Save the access token in the JWT token
        console.log("nanda====================>", account);
        token.access_token = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      // Make sure to pass the access token to the session
      session.access_token = token.access_token
      session.provider = token.provider
      return session
    },
  },
})
