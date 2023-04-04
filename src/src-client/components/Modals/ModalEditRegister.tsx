import { updateExpense } from "@/redux/slice/ExpenseSlice";
import { updateIncome } from "@/redux/slice/IncomeSlice";
import capitalize from "@/utils/capitalize";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import icoEditar from "../../../../assets/pencil-svgrepo-com.svg";
import Image from "next/image";
import FormRegister from "./FormAddRegister";
import { isValidExpense } from "@/utils/isValidExpense";

interface PropsModal {
  props: {
    type: String;
    description: String;
    category: String;
    value: number;
    id: String;
    table: String;
  };
}

const initialStateForm = {
  type: "",
  description: "",
  category: "",
  value: 0,
};

export function ModalEdit({ props }: PropsModal) {
  const [form, setForm] = useState(initialStateForm);
  const [show, setShow] = useState(false);
  const dispatch: Function = useDispatch();
  const totalIncomes = useSelector(
    (state: any) => state.IncomesReducer.totalIncomes
  );
  const totalExpenses = useSelector(
    (state: any) => state.ExpensesReducer.totalExpenses
  );

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setForm({
      value: props.value,
      category: props.category.toString(),
      description: props.description.toString(),
      type: props.type.toString(),
    });
    setShow(true);
  };

  const handleChange = (
    evt: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;

    setForm({ ...form, [name]: value });
  };

  const sendForm = () => {
    if (props.table === "ingresos") {
      dispatch(updateIncome(form, props.id));
    } else {
      const validExpense = isValidExpense(totalIncomes, totalExpenses, form);

      if (validExpense) {
        alert(validExpense);
      } else {
        dispatch(updateExpense(form, props.id));
        setForm(initialStateForm);
        handleClose();
      }
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="border-0 rounded-1 m-1 text-white"
      >
        <Image src={icoEditar} alt="Editar" width={30} height={30} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro - {capitalize(props.table)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegister setForm={setForm} form={form} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={sendForm}>
            Editar registro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
