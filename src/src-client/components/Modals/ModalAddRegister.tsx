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

export function ModalAddRegister({ props }: PropsModal) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState(initialStateForm);

  const dispatch: Function = useDispatch();

  const handleChange = (
    evt: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    setForm(initialStateForm);
    handleClose();
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
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <form action="" className="d-flex flex-column">
            <div className="input-group mb-3 w-100">
              <label htmlFor="type" className="input-group-text">
                Tipo de ingreso
              </label>
              <select
                name="type"
                id=""
                onChange={handleChange}
                value={form.type}
                className="form-select"
                aria-describedby="Tipo"
                placeholder="Tipo de ingreso"
              >
                <option value="" disabled></option>
                <option value="negocio">Negocio</option>
                <option value="personales">Personal</option>
              </select>
            </div>

            <div className="input-group mb-3 w-100">
              <label htmlFor="text" className="input-group-text">
                Categoria
              </label>
              <input
                type="category"
                value={form.category}
                onChange={handleChange}
                name="category"
                className="form-control"
                aria-describedby="Categoria"
                placeholder="Ingresa aca la categoria"
              />
            </div>

            <div className="input-group mb-3 w-100">
              <label htmlFor="value" className="input-group-text">
                Valor
              </label>
              <input
                type="number"
                value={form.value}
                onChange={handleChange}
                name="value"
                className="form-control"
                aria-describedby="Valor"
                placeholder="Ingresa aca el valor"
              />
            </div>

            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                value={form.description}
                onChange={handleChange}
                name="description"
                rows={5}
              ></textarea>
              <label htmlFor="floatingTextarea">Descripción</label>
            </div>
          </form>
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
