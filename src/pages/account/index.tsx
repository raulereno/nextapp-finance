import NavBar from "@/src-client/components/NavBar";
import React from "react";
import { useSession } from "next-auth/react";
import { Container, Row, Image} from "react-bootstrap";
import LogoUser from "../../../assets/UserDefault.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


const Account = () => {
  const { data: session } = useSession();

  
  /* const dispatch = useDispatch();
    
  const newUser = useSelector((state) => state.session.user.email)
  
  const [input, setInput] = useState({
    email: newUser.session.user.email,
    name: newUser.session.user.name,
    
    
  });

  function handleSubmit(e){
    e.preventDefault()
    dispatch((input))// falta ruta del put        
    setInput({
      email: "",
      name: "",      
    })
           
}
function handleChange(e){
  setInput({
      ...input,
      [e.target.name] : e.target.value
  })      
}
 */


  return (
    <div className="bg-Blue w-100 d-flex justify-content-center align-items-center">
      <aside className="card bg-light w-50 h-90 p-4 border-dark d-flex align-items-center">
        <div className=" card-title">
          <h1>Cuenta</h1>
        </div>

        {session && (
          <div className="card-body flex-column align-items-center">
            <Image
              src={session.user?.image ?? LogoUser.toString()}
              alt="img"
              className="user-img rounded-circle"
            ></Image>
            <div className="d-flex flex-column align-content-start">
                                       
              <p>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p >
                <strong>Usuario: 
                  <input 
                  onChange={handleChange}
                  type='text'></input>
                </strong> 
              </p>  
              <p>
                <strong>Nombre:
                  <input 
                  onChange={handleChange}
                  type="text"></input>
                </strong>
              </p>        
            </div>
          </div>
        )}      



          <button
            className="btn btn-primary mt-1" 
            type='submit'

          >Editar
          </button>       
       

      </aside>

    </div>
  );
};

export default Account;


{/* <Container className="mt-4">
        <h1>Cuenta</h1>
        <Row>
          {session && (
            <div className="jumbotron">
              <h2 className="display-4">User information:</h2>
              <Image
                src={session.user?.image ?? LogoUser.toString()}
                alt="img"
                className="user-img rounded-circle"
              ></Image>
              <p className="lead mt-2">
                <strong>User:</strong> {session.user?.name}
              </p>
              <p className="lead">
                <strong>Email:</strong> {session.user?.email}
              </p>
              <hr className="my-4"></hr>
              <p className="lead">
                <a
                  className="btn btn-outline-warning btn-lg"
                  href="#"
                  role="button"
                >
                  Edit
                </a>
              </p>
            </div>
          )}
        </Row>
      </Container> */}
