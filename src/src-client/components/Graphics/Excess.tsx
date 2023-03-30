import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Excess({ options, data }: any) {
  return (
    <div
      className="bg-Blue col-3 rounded-4  text-white containerGraphicosDivExc"
      style={{ width: "350px" }}
    >
      <h2>Excedentes</h2>

      {data.datasets[0].data[0] !== 0 || data.datasets[0].data[1] !== 0 ? (
        <Doughnut
          options={options}
          height="250"
          width="250"
          id="income_canva"
          data={data}
        />
      ) : (
        <h2 className="heandingExcedent">No hay registros</h2>
      )}
    </div>
  );
}
