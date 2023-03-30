import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { ModalAddRegister } from "../Modals/ModalAddRegister";

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
  console.log(data.datasets[0].data[0]);

  return (
    <div
      className="bg-Blue col-3 rounded-4  text-white containerGraphicosDiv"
      style={{ width: "350px" }}
    >
      <h2>Ingresos</h2>

      {data.datasets[0].data[0] !== 0 || data.datasets[0].data[1] !== 0 ? (
        <Doughnut
          options={optionsPlus}
          height="250"
          width="250"
          id="income_canva"
          data={data}
        />
      ) : (
        <h2>No hay registros</h2>
      )}
      <ModalAddRegister props={propsModal} />
    </div>
  );
}
