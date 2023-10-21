import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../libs/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// // Initialize NextAuth and specify the express app
// nextAuth(app, nextAuthOptions);

// // Custom routes for login, logout, and session
// app.post('/api/auth/signin', (req, res) => {
//   // Handle user login here
//   // This route corresponds to the login action
// });

// app.post('/api/auth/signout', (req, res) => {
//   // Handle user logout here
//   // This route corresponds to the logout action
// });

// app.get('/api/auth/session', (req, res) => {
//   // Return user session information here
//   // This route corresponds to checking the user's session
// });

// // Start your Express app
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });
