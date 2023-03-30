import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LogButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="d-flex align-items-center">
        <span className="me-2">
          Signed in as {session.user.email}
        </span>
        <button className="btn btn-primary" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="d-flex align-items-center">
      <span className="me-2">
        Not signed in
      </span>
      <button className="btn btn-outline-primary" onClick={() => signIn("auth0")}>Sign in</button>
    </div>
  );
};

export default LogButton;
