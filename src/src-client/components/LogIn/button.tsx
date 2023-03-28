import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LogButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("auth0")}>Sign in</button>
    </>
  );
};

export default LogButton;
