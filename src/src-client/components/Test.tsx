import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
function Test() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='bg-DarkBlue'>
      <Button className='bg-DarkBlue' onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="bg-DarkBlue">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Finance App</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant="pills" defaultActiveKey="/home" className='flex-column '>
            <Nav.Item >
              <Nav.Link href="/" eventKey='Home'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="account">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="settings">
                Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}


export default Test