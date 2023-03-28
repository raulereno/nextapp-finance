import NextAuth, {NextAuthOptions} from 'next-auth'
import Auth0Provider from "next-auth/providers/auth0"
import { config } from "dotenv";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
config();

const clientId: any = process.env.CLIENT_ID
const clientSecret: any = process.env.CLIENT_SECRET
const issuer: any = process.env.DOMAIN
console.log(clientId, clientSecret, issuer);


export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    // Configure one or more authentication providers
    providers: [
      Auth0Provider({
        clientId,
        clientSecret,
        issuer
      }),
      // ...add more providers here
    ],
    theme: {
      colorScheme: "dark",
    },
  }
  export default NextAuth(authOptions)