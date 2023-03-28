import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { deleteExpenses } from "@/redux/slice/ExpenseSlice";
import { deleteIncome } from "@/redux/slice/IncomeSlice";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import icoBorrar from "../../../../assets/trash-bin-delete-svgrepo-com.svg";
import Image from 'next/image';
import { ModalEdit } from "../Modals/ModalEditRegister";

export const TableComponent = ({ content, filters }: any) => {
  const dispatch: Function = useDispatch();

  const deleteRegister = (id: String) => {
    Swal.fire({
      title: "Esta seguro que desea borrar el registro?",
      showDenyButton: true,

      denyButtonText: `Cancelar`,
      confirmButtonText: "Borrar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (filters.type === "ingresos") {
          dispatch(deleteIncome(id));
        } else {
          dispatch(deleteExpenses(id));
        }
        Swal.fire("Borrado!", "", "success");
      }
    });
  };

  return (
    <div className="col-12 text-white">
      <h1>Tablas {filters.type}</h1>
      <Table>
        <thead className="text-white">
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Value</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {content
            .filter((ele: IncomeType | ExpenseType) => {
              if (ele.type[0] === filters.slice) {
                return ele;
              }
            })
            .map((ele: IncomeType | ExpenseType) => {
              return (
                //TODO:Aqui no deja agregar el id como key
                <tr key={Math.random()}>
                  <td>{capitalize(ele.type[0])}</td>
                  <td>{capitalize(ele.category)}</td>
                  <td>${ele.value}</td>
                  <td>{capitalize(ele.description)}</td>
                  <td>
                    <ModalEdit  props={{
                        type: ele.type[0],
                        category: ele.category,
                        description: ele.description,
                        value: ele.value,
                        id: ele._id!,
                        table: filters.type,
                      }}/>
                    <button
                      onClick={() => {
                        deleteRegister(ele._id!);
                      }}
                      className="border-0 rounded-1 m-1 text-white"
                    >
                      <Image src={icoBorrar} alt="Borrar" width={30} height={30} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

const capitalize = (string: String) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
