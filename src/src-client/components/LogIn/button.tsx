import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LogoUser from "../../../../assets/UserDefault.png";
import { Image } from "react-bootstrap";
import Link from "next/link";

const LogButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="divCard align-items-center" style={{ whiteSpace: 'nowrap' }}>
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
          <span className="text-light">¡Hola, {session?.user.name}!</span>
          <button className="btn-general mt-1" onClick={() => signOut()}>
            <span className=" text-light my-2">Sign out</span>
          </button>
        </div>

      </div>
    );
  }
  return (
    <div className="divCard" style={{ whiteSpace: 'nowrap' }}>
      <span className="ms-2 mx-3 text-light flip-vertical-right" >Not signed in</span>
      <div className="d-flex flip-vertical-right gap-2" >
        <button className="btn btn-general btn-Logaout" style={{ width: "calc(50% + 100px)" }} onClick={() => signIn()}>
          <span className="ms-2 mx-3 text-light flip-vertical-right">Sign in</span>
        </button>
      </div>
    </div>
  );
};

export default LogButton;
