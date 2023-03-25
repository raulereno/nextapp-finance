import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Excess({ options, data }: any) {
  return (
    <div className="bg-Blue" style={{ width: "500px" }}>
      <h2>Excedentes</h2>

      <Pie
        options={options}
        height="250"
        width="250"
        id="income_canva"
        data={data}
      />
    </div>
  );
}