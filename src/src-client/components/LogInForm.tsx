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
      {providers &&
        Object.values(providers).map(
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
        await loginUser();
        redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className="align-items-lg-center m-3">
      <div className="container text-end">
          <p>
            {authType === "Login"
              ? <b>"Not registered yet? "</b>
              : "Already have an account? "}
            <button 
              className="btn btn-primary p-1"
              onClick={() => setAuthType(oppAuthType[authType])}>
              <p>{oppAuthType[authType]}</p>
            </button>
          </p>
          </div>
      <div className="container">
        <div className="container mb-5">
          <h2>{authType}</h2>         
          </div>

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
              <div className="">
              <Form style={{ width: "100%" }}>
                <article className="col-12 col-lg-6">
                  {authType === "Register" && (
                    <Field name="username">
                      {() => (
                        <div className="mb-3">
                          <label 
                          className="form-label"
                          htmlFor="username">Username:</label>
                          <input
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            type="text"
                          />
                        </div>
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <div className="mb-3">
                        <label 
                        className="form-label"
                        htmlFor="email">Email:</label>
                        <input
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          type="email"
                        />
                      </div>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <div className="mb-3">
                        <label 
                        className="form-label"
                        htmlFor="password">Password</label>
                        <input
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    )}
                  </Field>
                  <div className="mb-3">
                    <button 
                      className="btn btn-success"
                      type="submit">{authType}
                    </button>
                  </div>
                </article>
                
              </Form>
              </div>
            )}
          </Formik>
        
      </div>
    </div>
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
