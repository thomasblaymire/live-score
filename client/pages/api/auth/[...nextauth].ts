import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
})
