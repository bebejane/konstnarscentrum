import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword, findUser } from '/lib/auth'

//export const config = { runtime: 'experimental-edge' }

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 365 * (24 * 60 * 60), // 365 days
  },
  pages: {
    signIn: '/konstnar/konto/logga-in',
    signOut: '/konstnar/konto',
    error: '/konstnar/konto/auth?type=error', // Error code passed in query string as ?error=    
    //verifyRequest: '/auth/verify-request', // (used for check email message)    
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)  }
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // if(account.type !== 'credentials' && !(await findUser(user.email)))
      // throw new Error('Access denied. Please registered for your account first.')
      return true
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        try {

          const { username: email, password } = credentials
          const user = await findUser(email)

          if (!user) return null
          const isDev = process.env.DATOCMS_ENVIRONMENT === 'dev'
          const checkPassword = isDev ? true : await comparePassword(password, user.password);

          if (!checkPassword) {
            console.error('not a valid password!')
            return null
          }

          // Login passed, return user. 
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        } catch (err) {
          console.error(err)
          return null
        }
      }
    })
  ]
}

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
export default handler