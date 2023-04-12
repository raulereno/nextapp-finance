import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { deleteExpenses } from "@/redux/slice/ExpenseSlice";
import { deleteIncome } from "@/redux/slice/IncomeSlice";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import icoBorrar from "../../../../assets/trash-bin-delete-svgrepo-com.svg";
import Image from "next/image";
import { ModalEdit } from "../Modals/ModalEditRegister";
import capitalize from "@/utils/capitalize";

export const TableComponent = ({ content, filters }: any) => {
  console.log(filters);

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

  const searchTable = () => {
    // Obtener el valor del input de búsqueda
    const input = document.querySelector<HTMLInputElement>("#searchInput");
    if (!input) return;
    const filter = input.value.toUpperCase();

    // Obtener la tabla y las filas de la tabla
    const table = document.querySelector(".table");
    if (!table) return;
    const trs = table.getElementsByTagName("tr");

    // Recorrer todas las filas y ocultar las que no cumplan con la búsqueda, excepto el encabezado
    for (let i = 0; i < trs.length; i++) {
      const tds = trs[i].getElementsByTagName("td");
      let visible = false;
      if (filter === "") {
        if (trs[i].classList.contains("thead")) {
          visible = true;
        }
      } else {
        if (!trs[i].classList.contains("thead")) {
          for (let j = 0; j < tds.length; j++) {
            const td = tds[j];
            if (td) {
              const textValue = td.textContent || td.innerText;
              if (textValue.toUpperCase().indexOf(filter) > -1) {
                visible = true;
              }
            }
          }
        }
      }
      if (visible) {
        (trs[i] as HTMLElement).style.display = "";
      } else {
        (trs[i] as HTMLElement).style.display = "none";
      }
    }
  };
  if (!filters.slice && !filters.type) {
    return;
  }

  return (
    <div className="col-12 text-white">
      <h1>Tablas {filters.type}</h1>
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar"
                onKeyUp={searchTable}
                id="searchInput"
              ></input>
            </div>
          </form>
        </div>
      </div>

      <Table className="table table-hover table-active mt-3">
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
                  <td>{capitalize(filters.type)}</td>
                  <td>{capitalize(ele.category)}</td>
                  <td>${ele.value}</td>
                  <td>{capitalize(ele.description)}</td>
                  <td>
                    <ModalEdit
                      props={{
                        type: ele.type[0],
                        category: ele.category,
                        description: ele.description,
                        value: ele.value,
                        id: ele._id!,
                        table: filters.type,
                      }}
                    />
                    <button
                      onClick={() => {
                        deleteRegister(ele._id!);
                      }}
                      className="border-0 rounded-1 m-1 text-white"
                    >
                      <Image
                        src={icoBorrar}
                        alt="Borrar"
                        width={30}
                        height={30}
                      />
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
