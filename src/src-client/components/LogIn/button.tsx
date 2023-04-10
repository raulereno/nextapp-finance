import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LogoUser from "../../../../assets/UserDefault.png";
import { Image } from "react-bootstrap";
import Link from "next/link";

const LogButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="d-flex align-items-center">
        <span className="me-2">
          <Link href="/account">
            <Image
              width={45}
              height={45}
              src={session.user.image!}
              alt="User image"
            />
          </Link>
        </span>
        <button className="btn btn-primary" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="d-flex align-items-center">
      <span className="me-2">Not signed in</span>
      <button className="btn btn-outline-primary" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
};

export default LogButton;
