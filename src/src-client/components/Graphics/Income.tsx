import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { ModalAdd } from "../Modals/ModalAddRegister";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Income({ options, data, setTableContent }: any) {
  const propsModal = {
    title: "Agregar ingresos",
    buttonText: "Agregar ingresos",
    type: "income",
  };
  const optionsPlus = {
    ...options,
    onClick: function (event: any, elements: any) {
      const slice = {
        type: "ingresos",
        slice: elements[0]?.index === 0 ? "negocio" : "personales",
      };

      setTableContent(slice);
    },
  };

  return (
    <div className="bg-Blue col-3" style={{ width: "350px" }}>
      <h2>Ingresos</h2>

      <Pie
        options={optionsPlus}
        height="250"
        width="250"
        id="income_canva"
        data={data}
      />
      <ModalAdd props={propsModal} />
    </div>
  );
}
