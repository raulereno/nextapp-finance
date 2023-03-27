import { addExpense } from "@/redux/slice/ExpenseSlice";
import { addIncome } from "@/redux/slice/IncomeSlice";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

interface PropsModal {
  props: {
    title: string;
    buttonText: string;
    type: string;
  };
}

const initialStateForm = {
  type: "",
  description: "",
  category: "",
  value: 0,
};

export function ModalAdd({ props }: PropsModal) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState(initialStateForm);

  const dispatch: Function = useDispatch();

  const handleChange = (
    evt: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;

    setForm({ ...form, [name]: value });
  };

  const sendForm = () => {
    if (props.type === "expense") {
      dispatch(addExpense(form));
    } else {
      dispatch(addIncome(form));
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="d-flex flex-column">
            <label htmlFor="">
              Tipo de ingreso:
              <select
                name="type"
                id=""
                onChange={handleChange}
                value={form.type}
              >
                <option value="" disabled selected></option>
                <option value="negocio">Negocio</option>
                <option value="personales">Personal</option>
              </select>
            </label>
            <label htmlFor="">
              Categoria
              <input
                type="text"
                value={form.category}
                onChange={handleChange}
                name="category"
              />
            </label>
            <label htmlFor="">
              Valor:
              <input
                type="number"
                value={form.value}
                onChange={handleChange}
                name="value"
              />
            </label>
            <label htmlFor="">
              Descripción:
              <input
                type="text"
                value={form.description}
                onChange={handleChange}
                name="description"
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
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
