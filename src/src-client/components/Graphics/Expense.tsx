import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { ModalAddRegister } from "../Modals/ModalAddRegister";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Expense({ options, data, setTableContent }: any) {
  const propsModal = {
    title: "Agregar egreso",
    buttonText: "Agregar egreso",
    type: "expense",
  };

  const optionsPlus = {
    ...options,
    onClick: function (event: any, elements: any) {
      const slice = {
        type: "gastos",
        slice: elements[0]?.index === 0 ? "negocio" : "personales",
      };
      setTableContent(slice);
    },
  };

  return (
    <div
      className="bg-Blue col-3 rounded-4  text-white containerGraphicosDiv"
      style={{ width: "350px" }}
    >
      <h2>Gastos</h2>
      <Doughnut
        options={optionsPlus}
        height="250"
        width="250"
        id="income_canva"
        data={data}
      />
      <ModalAddRegister props={propsModal} />
    </div>
  );
}
