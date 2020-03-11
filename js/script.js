import * as foodChart from "./foodChart_new.js";
import * as diabetesGeneralChart from "./diabetesGeneral.js";

const init = async () => {
  diabetesGeneralChart.init();
  foodChart.init();
};

window.onload = init;
