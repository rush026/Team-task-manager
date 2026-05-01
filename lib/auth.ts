// src/lib/auth.ts mein callbacks wala section dekho
callbacks: {
  async jwt({ token, user }) {
    // Jab user pehli baar login karta hai, uska role token mein daal do
    if (user) {
      token.role = (user as any).role;
      token.id = user.id;
    }
    return token;
  },
  async session({ session, token }) {
    // Ab token se role nikaal kar frontend (session) ko de do
    if (session.user) {
      (session.user as any).role = token.role;
      (session.user as any).id = token.id;
    }
    return session;
  },
},