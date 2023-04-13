import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Logo from "../../../assets/logo.png";
import Image from "next/image";
import LogButton from "./LogIn/button";

interface Ipage {
  page: string;
}

function NavBar({ page }: Ipage) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="navBar-Container">
      <Button className=" border-0" onClick={handleShow}>
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
      </Offcanvas>
    </div>
  );
}

export default NavBar;
