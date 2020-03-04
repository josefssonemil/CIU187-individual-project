import * as foodChart from "./foodChart_new.js";
import * as diabetesAgeChart from "./diabetesAgeChart.js";
import * as diabetesGeneralChart from "./diabetesGeneral.js";

const init = async () => {
  diabetesGeneralChart.init();
  foodChart.init();
  diabetesAgeChart.init();
};

window.onload = init;
