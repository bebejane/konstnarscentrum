import { Dato } from '/lib/dato/api'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword } from '/lib/auth'

const options = {
  site: process.env.NEXTAUTH_URL,
  session: {  
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {    
    signIn: '/auth?type=signin',    
    signOut: '/auth?type=signout',    
    error: '/auth?type=error', // Error code passed in query string as ?error=    
    //verifyRequest: '/auth/verify-request', // (used for check email message)    
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)  }
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text"},
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username: email, password } = credentials
        const users = await Dato.items.all({filter: {type: "member", fields: { email: { eq: email}}}});
        const user = users && users.length === 1 ? users[0] : undefined 
        
        if (!user) return null
        
        const checkPassword = await comparePassword(password, user.password);

        if(!checkPassword){
          console.error('not a valid password!')
          return null
        }
        // Login passed, return user. Any object returned will be saved in `user` property of the JWT
        return {
          id:user.id,
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName
        }
      }
    })
  ]
}

export default (req, res) => NextAuth(req, res, options)
