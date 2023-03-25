import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { ModalAdd } from "./ModalAdd";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Expense({ options, data }: any) {
  const propsModal = {
    title: "Agregar egreso",
    buttonText: "Agregar egreso",
    type: "expense",
  };
  return (
    <div className="bg-Blue" style={{ width: "500px" }}>
      <h2>Gastos:</h2>
      <Pie
        options={options}
        height="250"
        width="250"
        id="income_canva"
        data={data}
      />
      <ModalAdd props={propsModal} />
    </div>
  );
}
