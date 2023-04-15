import { addExpense } from "@/redux/slice/ExpenseSlice";
import { addIncome } from "@/redux/slice/IncomeSlice";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormRegister from "./FormAddRegister";
import { isValidExpense } from "@/utils/isValidExpense";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import {
  addCompanyExpense,
  addCompanyIncome,
} from "@/redux/slice/CompanySlice";
import { TotalRegisters } from "@/types/TotalRegister.type";
import {
  addPersonalExpense,
  addPersonalIncome,
  getUserFinance,
} from "@/redux/slice/PersonalSlice";

interface PropsModal {
  props: {
    title: string;
    buttonText: string;
    type: string;
  };
  type?: string;
}

const initialStateForm = {
  type: "",
  description: "",
  category: "",
  value: 0,
};

export function ModalAddRegister({
  props,
  type,
  dataIncomes,
  dataExpenses,
}: any) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState(initialStateForm);
  const { data: session } = useSession();
  const totalIncomes = useSelector(
    (state: any) => state.IncomesReducer.totalIncomes
  );
  const totalExpenses = useSelector(
    (state: any) => state.ExpensesReducer.totalExpenses
  );

  const dispatch: Function = useDispatch();
  const email = session?.user?.email;

  const sendForm = async () => {
    if (email && email !== null && email !== undefined) {
      if (props.type === "expense") {
        // const validExpense = isValidExpense(
        //   totalIncomes,
        //   totalExpenses,
        //   form,
        //   type
        // );

        // if (validExpense) {
        //   Swal.fire({
        //     title: validExpense,
        //     text: "Estas seguro?",
        //     showDenyButton: true,
        //     confirmButtonText: "Aceptar",
        //     denyButtonText: `Cancelar`,
        //     reverseButtons: true,
        //   }).then((result) => {
        //     /* Read more about isConfirmed, isDenied below */
        //     if (result.isConfirmed) {
        //       if (type === "negocio") {
        //         dispatch(addCompanyExpense({ ...form, type: type! }, email));
        //         setForm(initialStateForm);
        //         handleClose();
        //       } else {
        //         dispatch(addExpense({ ...form, type: type! }, email));
        //         setForm(initialStateForm);
        //         handleClose();
        //       }
        //     } else if (result.isDenied) {
        //       setForm(initialStateForm);
        //       handleClose();
        //     }
        //   });
        // } else {
        if (type === "negocio") {
          dispatch(addCompanyExpense({ ...form, type: type! }, email));
          setForm(initialStateForm);
          handleClose();
        } else {
          dispatch(addPersonalExpense({ ...form, type: type! }, email));
          setForm(initialStateForm);
          handleClose();
        }
        // }
      } else {
        if (type === "negocio") {
          dispatch(addCompanyIncome({ ...form, type: type! }, email));
          setForm(initialStateForm);
          handleClose();
        } else {
          await dispatch(addPersonalIncome(email, { ...form, type: type! }));
          setForm(initialStateForm);
          handleClose();
        }
      }
      // await dispatch(getUserFinance(session?.user?.email!));
    }
  };

  return (
    <>
      <Button
        className="colorBtnAgregar text-center m-3"
        variant="outline-light"
        onClick={handleShow}
      >
        {props.buttonText}
      </Button>

      <Modal className="text-center" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center">
            {props.title} {type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <FormRegister setForm={setForm} form={form} />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={sendForm}>
            {props.buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
