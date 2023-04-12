import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LogoUser from "../../../../assets/UserDefault.png";
import { Image } from "react-bootstrap";
import Link from "next/link";

const LogButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="divCard align-items-center">
        <div className="d-flex align-items-center flip-vertical-right user-card">
          <Link href="/account">
            <Image
              width={45}
              height={45}
              src={session.user.image!}
              alt="User image"
            />
          </Link>

        </div>
        <div className="d-flex flex-column gap-4">
          <span className="ms-2 mx-3  text-light flip-vertical-right">¡Hola, {session?.user.name}!</span>
          <button className="btnLogin" onClick={() => signOut()}>
            Sign out
          </button>
        </div>

      </div>
    );
  }
  return (
    <div className="divCard">
      <div className="d-flex flip-vertical-right gap-2" >
        <span className="me-2" style={{ width: "calc(80% + 50px)" }}>Not signed in</span>
        <button className="btn btn-outline-primary gap-2" style={{ width: "calc(100% + 50px)" }} onClick={() => signIn()}>
          <span className="ms-2 mx-3  text-light flip-vertical-right">Sign in</span>
        </button>
      </div>
    </div>
  );
};

export default LogButton;
