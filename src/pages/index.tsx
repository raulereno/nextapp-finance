import { Graphics } from "@/src-client/components/Graphics";
import NavBar from "@/src-client/components/NavBar";
import { useSession } from "next-auth/react";

import Head from "next/head";
import { Router, useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Personal Finance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar page="home" />

        <div className="container-graphics">
          <Graphics />
        </div>
      </main>
    </>
  );
}
