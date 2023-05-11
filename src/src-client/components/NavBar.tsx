import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import Logo from "../../../assets/logo.png";
import Image from "next/image";
import LogButton from "./LogIn/button";
import Link from "next/link";
import { getRole } from "../utilities/getRole";

interface Ipage {
  page: string;
}

function NavBar({ page }: Ipage) {
  const { data: session } = useSession()
  const [admin, setAdmin] = useState(false)
  const email = session?.user?.email

  useEffect(() => {
    if (!admin && session && session.user) getRole(email, setAdmin)
  }, [admin, session])

  return (
    <div className="" style={{ width: "319px", background: "#2A2A2A" }}>
      <div className="container">
        <div className="row container-barra-lateral">
          <div className="col-md-12 justify-content-center first-div">
            <nav className="">
              <ul className="d-flex flex-column list-unstyled" style={{ height: "775px" }}>
                <li>
                  <div className="d-flex justify-content-center" style={{ marginTop: "49px", marginLeft: "20px", width: "177px", background: "#D9D9D9" }}>
                    <Link href={"/"}>
                      <Image src={Logo} alt="logo" width={80} height={40} className="mx-auto img-fluid" />
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center text-dark" style={{ marginTop: "13px", marginLeft: "20px", width: "127px", height: "33px", background: "#D9D9D9", fontFamily: "Montserrat" }}>
                    {/* //TODO:espacio sin usar */} hola
                  </div>
                </li>
                <li className=" d-flex justify-content-center">
                  <div className="btn-general d-flex justify-content-center align-items-center" style={{ marginTop: "63px", }}>
                    <Link className="" href="/">
                      Personales
                    </Link>
                  </div>
                </li>
                <li className=" d-flex justify-content-center">
                  <div className="btn-general d-flex justify-content-center align-items-center " style={{ marginTop: "63px", }}>
                    <Link className="" href="/company">
                      Compañias
                    </Link>
                  </div>
                </li>

                {admin &&
                  <li className=" d-flex justify-content-center">
                    <div className="btn-general d-flex justify-content-center align-items-center" style={{ marginTop: "63px", }}>
                      <Link className="text-center" href="/admin">
                        Admin
                      </Link>
                    </div>
                  </li>
                }
              </ul>
            </nav>
          </div>
          <div className="col-md-12 text-center second-div d-flex justify-content-center">
            <LogButton />
          </div>
        </div>
      </div>
    </div>

  );
}


export default NavBar;



{/* <nav>
        <ul className="d-flex flex-column">
          <li>
            <Link href={"/"}>
              <Image src={Logo} alt="logo" width={150} height={80} />
            </Link>
          </li>
          <li></li>
          <li>
            <Link className="btn-general mt-3" href="/">
              Personales
            </Link>
          </li>
          <li>
            <Link className="btn-general mt-3" href="/company">
              Compañias
            </Link>
          </li>
          {admin &&
            <li>
              <Link className="btn-general mt-3" href="/admin">
                Admin
              </Link>
            </li>
          }
          <li style={{ position: "absolute", bottom: "0" }}>
            <LogButton />
          </li>
        </ul>
      </nav> */}

{
  /* <Button className=" border-0" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="bg-LightBlue">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div>
              <Image src={Logo} alt="logo" width={150} height={80} />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            variant="pills"
            defaultActiveKey="/home"
            className="flex-column "
          >
            <Nav.Item>
              <Nav.Link
                eventKey="home"
                href="/"
                className="active-bg-DarkBlue"
                active={page === "home"}
                disabled={page === "home"}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/Account"
                eventKey="account"
                active={page === "account"}
                disabled={page === "account"}
              >
                Account
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href='/company'
                eventKey="company"
                active={page === "company"}
                disabled={page === "company"}
              >
                Company
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <LogButton />
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas> */
}
