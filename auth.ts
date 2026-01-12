import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from './app/lib/dbConnect';
import User from '@/app/lib/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [ 
    
    Credentials({
      async authorize(credentials) {

        if (credentials === undefined) {
          return null;
        }

        const { email, password } = credentials;

        if (typeof email !== 'string' || typeof password !== 'string') {
          return null;
        }
        
        await dbConnect();

        const user = await User.findOne({ email: email }).select('+password').lean();


        if (!user) return null

        if (password !== user.password) return null

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            //image: user.image,
        }

      },
    })
  
  ],
});