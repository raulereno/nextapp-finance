import { useState } from "react";
import type { NextPage } from "next";
import { signIn, getProviders } from "next-auth/react";

import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";
import { Alert } from "react-bootstrap";
import { log } from "console";




const Auth: NextPage = ({ providers }: any) => {
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ProvidersButtons = ({ providers }: any) => (
    <div className="d-flex flex-column w-100%">
      {providers && Object.values(providers).map(
        (provider: any) =>
          provider.name !== "Credentials" && (
            <button
              key={provider.name}
              type="submit"
              onClick={() => {
                signIn(provider.id, {
                  callbackUrl: `${process.env.AUTH0_BASE_URL}`,
                });
              }}
            >
              <p>Sign in with {provider.name}</p>
            </button>
          )
      )}
    </div>
  );

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        
        await loginUser();
        redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };

  const formSubmit = (actions: any) => {
    actions.setSubmitting(false);

    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <>
      <div
      >
        <div className='d-flex flex-column justify-center align-center'>
          <h2>{authType}</h2>
          <p>
            {authType === "Login"
              ? "Not registered yet? "
              : "Already have an account? "}
            <button onClick={() => setAuthType(oppAuthType[authType])}>
              <p>{oppAuthType[authType]}</p>
            </button>
          </p>

          <ProvidersButtons providers={providers} />

          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form style={{ width: "100%" }}>
                <div className='d-flex flex-column w-100% margin-b-4'>
                  {authType === "Register" && (
                    <Field name="username">
                      {() => (
                          <>
                          <label htmlFor="username">Username:</label>
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            type="text"
                          />
                          </>  
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <>
                        <label htmlFor="email">Email:</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          type="email"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <>
                        <label htmlFor="password">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                        />
                      </>
                    )}
                  </Field>
                  <button
                    type="submit"
                  >
                    {authType}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      </>
  );
};

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}