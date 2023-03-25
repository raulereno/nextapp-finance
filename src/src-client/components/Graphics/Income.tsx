import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { ModalAdd } from "./ModalAdd";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Income({ options, data }: any) {
  const propsModal = {
    title: "Agregar ingresos",
    buttonText: "Agregar ingresos",
    type: "income",
  };

  return (
    <div className="bg-Blue" style={{ width: "500px" }}>
      <h2>Ingresos</h2>

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
