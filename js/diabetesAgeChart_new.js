let diabetesAgeChartMen, diabetesAgeChartWomen;

const LESS_THAN_20 = "Under 20";
const TWENTYTOFOURTYFOUR = "20-44";
const FORTYFIVETOSIXTYFOUR = "45-64";
const OVERSIXTYFIVE = "Over 65";

const MEN = "Men";
const WOMEN = "Women";

const START_YEAR = 2007;




const getCategorisedDiabetesData = data => ({
    twentyTo44: data.reduce((acc, currVal) => {
      return {
        ...acc,
        [currVal.Year]: currVal[TWENTYTOFOURTYFOUR]
      };
    }, {}),
    fourtyfiveTo64: data.reduce(
      (acc, currVal) => ({
        ...acc,
        [currVal.Year]: currVal[FORTYFIVETOSIXTYFOUR]
      }),
      {}
    ),
    over65: data.reduce(
      (acc, currVal) => ({
        ...acc,
        [currVal.Year]: currVal[OVERSIXTYFIVE]
      }),
      {}
    ),
    under20: data.reduce(
      (acc, currVal) => ({
        ...acc,
        [currVal.Year]: currVal[LESS_THAN_20]
      }),
      {}
    )
  });



  function drawDiabetesChartMen(data) {
        const chartData = {
            xLabels: [MEN],
            yLabels: [
                OVERSIXTYFIVE,
                FORTYFIVETOSIXTYFOUR,
                TWENTYTOFOURTYFOUR,
                LESS_THAN_20
              ],

              datasets: [
                  {
                      
                  }
              ]
        }
  }

  const drawDiabetesChartWomen = data = {

}



  const getDiabetesDataPopulationMen = async () => d3.csv("/./datasets/Men.csv");
  const getDiabetesDataPopulationWomen = async () => d3.csv("/./datasets/Women.csv");
  
export const init = async () => {
    const diabetesDataMen = await getDiabetesDataPopulationMen();
    const diabetesDataWomen = await getDiabetesDataPopulationWomen();
  
    const diabetesDataMenCategory = getCategorisedDiabetesData(diabetesDataMen);
    const diabetesDataWomenCategory = getCategorisedDiabetesData(
      diabetesDataWomen
    );
  
   
  
    const diabetesAgeSlider = document.getElementById("diabetesSlider");
    diabetesAgeSlider.addEventListener("input", e => onDiabetesSliderChange(e));
    document.getElementById("diabetes-year-text").innerHTML =
      "Year: " + diabetesAgeSlider.value;
  };


