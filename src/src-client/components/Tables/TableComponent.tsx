import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { deleteExpenses } from "@/redux/slice/ExpenseSlice";
import { deleteIncome } from "@/redux/slice/IncomeSlice";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export const TableComponent = ({ content, filters }: any) => {
  const dispatch: Function = useDispatch();

  console.log(filters);
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
    <div className="col-12">
      <h1>Tablas {filters.type}</h1>
      <Table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Value</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {content
            .filter((ele: IncomeType | ExpenseType) => {
              if (ele.type[0] === filters.slice) {
                return ele;
              }
            })
            .map((ele: IncomeType | ExpenseType) => {
              return (
                // <tr>
                //   <td>{income.type[0]}</td>
                //   <td>{income.category}</td>
                //   <td>{income.value}</td>
                //   <td>{income.description}</td>
                // </tr>
                <tr key={2}>
                  <td>{capitalize(ele.type[0])}</td>
                  <td>{capitalize(ele.category)}</td>
                  <td>${ele.value}</td>
                  <td>{capitalize(ele.description)}</td>
                  <td>
                    <button>🖋️</button>
                    <button
                      onClick={() => {
                        deleteRegister(ele._id);
                      }}
                    >
                      🚮
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
