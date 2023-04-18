import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';


const AdminModal = ({props}: any) => {
    const companyDetail = useSelector((state : any) => state.AdminSlice.selectedCompany)
    const userDetail = useSelector((state : any) => state.AdminSlice.selectedUser)


  return (
    <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Incomes</h3>
        <ul>
            {props.type === 'negocio' &&  companyDetail.incomes.map((ele : any) => {
                return(
                <li>{ele.category}</li>
                )
            })}
            {props.type === 'usuarios' &&  userDetail.incomes.map((ele : any) => {
                return(
                <li>{ele.category}</li>
                )
            })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {props.setShow(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminModal