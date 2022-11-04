import type { NextApiRequest, NextApiResponse } from 'next'
import client from '/lib/client'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import { comparePassword } from '/lib/auth'

const findUser = async (email:string) => {
  if(!email) 
    throw new Error('E-mail is not defined!')

  const users = await client.items.list({filter: {type: "member", fields: { email: { eq: email}}}});
  return users[0]
}

const options = {
  site: process.env.NEXTAUTH_URL,
  session: {  
    jwt: true,
    maxAge: 120 * (24 * 60 * 60), // 120 days
  },
  pages: {    
    signIn: '/auth?type=signin',    
    signOut: '/auth?type=signout',    
    error: '/auth?type=error', // Error code passed in query string as ?error=    
    //verifyRequest: '/auth/verify-request', // (used for check email message)    
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)  }
  },
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      // if(account.type !== 'credentials' && !(await findUser(user.email)))
        // throw new Error('Access denied. Please registered for your account first.')
      return true
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text"},
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        try{

          const { username: email, password } = credentials
          const user = await findUser(email)
      
          if (!user) return null
      
          const checkPassword = await comparePassword(password, user.password);

          if(!checkPassword){
            console.error('not a valid password!')
            return null
          }

          // Login passed, return user. 
          // Any object returned will be saved in `user` property of the JWT
          return {
            id:user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName
          }
        }catch(err){
          console.error(err)
          return null
        }
      }
    })
  ]
}

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export default handler
