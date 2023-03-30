import NavBar from '@/src-client/components/NavBar'
import React from 'react';
import { useSession } from 'next-auth/react';
import { Container, Row, Image } from 'react-bootstrap';
import LogoUser from "../../assets/UserDefault.png"


const Account = () => {
  const { data: session } = useSession()
  return (
    <div>
      <NavBar page='account' />
      <Container className='mt-4'>
        <h1 >ACCOUNT</h1>
        <Row>
          {
            session && (
              <div className='jumbotron'>
                <h2 className='display-4'>User information:</h2>
                <Image src={session.user?.image ?? LogoUser.toString()} alt='session.user?.name' className='user-img rounded-circle'></Image>
                <p className='lead mt-2'><strong>User:</strong> {session.user?.name}</p>
                <p className='lead'><strong>Email:</strong> {session.user?.email}</p>
                <hr className="my-4"></hr>
                <p className="lead">
                  <a className="btn btn-outline-warning btn-lg" href="#" role="button">Edit</a>
                </p>
              </div>
            )
          }
        </Row>
      </Container>

    </div>
  )
}

export default Account