import { useState } from "react";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Router from "next/router";
import { Alert } from "react-bootstrap";
import { log } from "console";
import axios from 'axios'


const Auth: NextPage = ({ providers }: any) => {
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formEnviado, setFormEnviado] = useState(false)

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
        { username, email, password, role: "user" },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res: any) => {
        await loginUser();
        redirectToHome();
      })
      .catch((error: any) => {
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
    <>
      <div className="container d-flex justify-content-center custom-container">
        <div className="form-container">
          <p className="title">{authType}</p>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: ""
            }}
            validate={(valor) => {
              let errores: any = {
                /*  username:'',
                 email:'',
                 password:'' */
              };

              //validacion username
              if (!valor.username) {
                errores.username = 'Ingresa un usuario valido'
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,8}$/.test(valor.username)) {
                errores.username = 'El nombre solo puede contener letras y un maximo de 8 caracteres'
              }

              //validacion email
              if (!valor.email) {
                errores.email = 'Ingrese un correo';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valor.email)) {
                errores.email = 'Correo incorrecto';
              }
              //validacion password
              if (!valor.password) {
                errores.password = 'Ingrese una contraseña';
              } else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,10}$/.test(valor.password)) {
                errores.password = 'debe tener entre 5 y 10 caracteres, al menos una minúscula y una mayúscula.';
              }
              return errores;
            }}
            /* validateOnChange={true}
            validateOnBlur={true}  */
            onSubmit={(valores, { resetForm }) => {
              resetForm()
              console.log('formulario enviado con exito')
              setFormEnviado(true)
            }}
          >

            {({ handleChange, handleBlur, errors, values, touched }) => (
              <Form
                className="form"
                style={{ width: "100%" }}

              >

                <div className="d-flex flex-column w-100% margin-b-4 input-group">
                  {authType === "Register" && (

                    <Field
                      name="username">
                      {() => (
                        <>
                          <label htmlFor="username">Username:</label>
                          <input
                            value={values.username}
                            name='username'
                            onChange={handleChange}
                            placeholder="Username"
                            type="text"
                            onBlur={handleBlur}
                          />
                          {touched.username && errors.username && <div className="error"
                            style={{ color: 'green' }}
                          >{errors.username}
                          </div>}
                        </>
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <>
                        <label htmlFor="email">Email</label>
                        <input
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          type="email"
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && <div className="error"
                          style={{ color: 'green' }}
                        >{errors.email}</div>}
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <>
                        <label htmlFor="password">Password</label>
                        <input
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          type="password"
                          placeholder="Password"
                          onBlur={handleBlur}
                          
                        />
                        {touched.password && errors.password && <div className="error"
                          style={{ color: 'green' }}
                        >{errors.password}</div>}
                      </>
                    )}
                  </Field>
                  {/* <div className="forgot">
                    <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                  </div> */}
                  <button type="submit" className="btn-general mt-3">{authType}</button>
                  {formEnviado && <p
                    style={{ color: 'green' }}
                    className="exito">Usuario creado con Exito!</p>}
                </div>
              </Form>
            )}

          </Formik>
          <div className="social-message">
            <div className="line"></div>
            <p className="message">Login with social accounts</p>
            <div className="line"></div>
          </div>
          <div className="social-icons">
            <button aria-label="Log in with Google" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
            <button aria-label="Log in with Twitter" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
              </svg>
            </button>
            <button aria-label="Log in with GitHub" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
          </div>

          <p className="signup">
            {authType === "Login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href="#"
              onClick={() => setAuthType(oppAuthType[authType])}
              className=""
            >
              {oppAuthType[authType]}
            </a>
          </p>

        </div>
      </div>

    </>
  )
}

{/* 
        <div className="d-flex flex-column justify-content-center  align-content-center">
          <h1 className="display-3">{authType}</h1>
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
              <Form className="form" style={{ width: "100%" }}>
                <div className="d-flex flex-column w-100% margin-b-4 input-group">
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
                        <label htmlFor="email">Email</label>
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
                  {/* <div className="forgot">
                    <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                  </div> */}
//   <button type="submit" className="btn-general mt-3">
//     {authType}
//   </button>
//     </div >
//     </Form >
//             )}
//           </Formik >
//         </div > * /}
//       </div >
//     </>
//   );
// };

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}