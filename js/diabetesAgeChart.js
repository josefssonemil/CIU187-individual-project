let diabetesAgeChart;

const LESS_THAN_20 = "Under 20";
const TWENTYTOFOURTYFOUR = "20-44";
const FORTYFIVETOSIXTYFOUR = "45-64";
const OVERSIXTYFIVE = "Over 65";
const SCALE_FACTOR = 2;

const MEN = "Men";
const WOMEN = "Women";

const getCategorisedDiabetesData = data => ({
  twentyTo44: data.reduce((acc, currVal) => {
    return {
      ...acc,
      [currVal.Year]: currVal[TWENTYTOFOURTYFOUR] * SCALE_FACTOR
    };
  }, {}),
  fourtyfiveTo64: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[FORTYFIVETOSIXTYFOUR] * SCALE_FACTOR
    }),
    {}
  ),
  over65: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[OVERSIXTYFIVE] * SCALE_FACTOR
    }),
    {}
  ),
  under20: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[LESS_THAN_20] * SCALE_FACTOR
    }),
    {}
  )
});

function drawDiabetesChartPopulation(men, women) {
  const START_YEAR = 2007;

  const bubbleChartData = {
    xLabels: [MEN, WOMEN],
    yLabels: [
      OVERSIXTYFIVE,
      FORTYFIVETOSIXTYFOUR,
      TWENTYTOFOURTYFOUR,
      LESS_THAN_20
    ],
    datasets: [
      // x is Category
      // y is a constant
      // r is the value of the current year
      {
        label: MEN,
        backgroundColor: "rgb(30,144,255)",
        borderColor: "rgb(30,144,255)",
        data: [
          {
            x: MEN,
            y: OVERSIXTYFIVE,
            r: men.over65[START_YEAR],
            vals: men.over65
          },
          {
            x: MEN,
            y: FORTYFIVETOSIXTYFOUR,
            r: men.fourtyfiveTo64[START_YEAR],
            vals: men.fourtyfiveTo64
          },
          {
            x: MEN,
            y: TWENTYTOFOURTYFOUR,
            r: men.twentyTo44[START_YEAR],
            vals: men.twentyTo44
          },
          {
            x: MEN,
            y: LESS_THAN_20,
            r: men.under20[START_YEAR],
            vals: men.under20
          }
        ],
        fill: false
      },
      {
        label: WOMEN,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [
          {
            x: WOMEN,
            y: OVERSIXTYFIVE,
            r: women.over65[START_YEAR],
            vals: women.over65
          },
          {
            x: WOMEN,
            y: FORTYFIVETOSIXTYFOUR,
            r: women.fourtyfiveTo64[START_YEAR],
            vals: women.fourtyfiveTo64
          },
          {
            x: WOMEN,
            y: TWENTYTOFOURTYFOUR,
            r: women.twentyTo44[START_YEAR],
            vals: women.twentyTo44
          },
          {
            x: WOMEN,
            y: LESS_THAN_20,
            r: women.under20[START_YEAR],
            vals: women.under20
          }
        ],
        fill: false
      }
    ]
  };

  const scalesOptions = {
    yAxes: [
      {
        type: "category",
        reverse: true,
        ticks: {
          max: LESS_THAN_20,
          min: OVERSIXTYFIVE,
          padding: 35
        },
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }
    ],
    xAxes: [
      {
        type: "category",
        position: "bottom",
        ticks: {
          min: MEN,
          max: WOMEN,
          padding: 16,
          fontStyle: "bold"
        },
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }
    ]
  };

  const tooltipsOptions = {
    callbacks: {
      label: (tooltipItem, data) => {
        const item = data.datasets[tooltipItem.datasetIndex];
        const label = item && item.label;
        const value = item && item.data[tooltipItem.index];

        return `${label}: ${value.r / SCALE_FACTOR}%`;
      }
    }
  };

  var fCtx = document.getElementById("diabetesChartTwo").getContext("2d");
  diabetesAgeChart = new Chart(fCtx, {
    // The type of chart we want to create
    type: "bubble",
    // The data for our dataset
    data: bubbleChartData,
    // Configuration options go here

    options: {
      responsive: true,
      layout: {
        padding: {
          left: 20,
          right: 100,
          top: 50
        }
      },
      title: {
        display: false
      },
      legend: {
        display: false
      },
      scales: scalesOptions,
      tooltips: tooltipsOptions
    }
  });
}

const onDiabetesSliderChange = e => {
  const year = e.target.value;
  document.getElementById("diabetes-year-text").innerHTML = "Year: " + year;
  updateDiabetesAgeChart(year);
};

const updateDiabetesAgeChart = year => {
  diabetesAgeChart.data.datasets.forEach(dataset => {
    const newData = dataset.data.map(item => ({ ...item, r: item.vals[year] }));
    dataset.data = newData;
  });
  diabetesAgeChart.update();
};

const getDiabetesDataPopulationMen = async () => d3.csv("/./datasets/Men.csv");
const getDiabetesDataPopulationWomen = async () => d3.csv("/./datasets/Women.csv");

export const init = async () => {
  const diabetesDataMen = await getDiabetesDataPopulationMen();
  const diabetesDataWomen = await getDiabetesDataPopulationWomen();

  const diabetesDataMenCategory = getCategorisedDiabetesData(diabetesDataMen);
  const diabetesDataWomenCategory = getCategorisedDiabetesData(
    diabetesDataWomen
  );

  drawDiabetesChartPopulation(
    diabetesDataMenCategory,
    diabetesDataWomenCategory
  );

  const diabetesAgeSlider = document.getElementById("diabetesSlider");
  diabetesAgeSlider.addEventListener("input", e => onDiabetesSliderChange(e));
  document.getElementById("diabetes-year-text").innerHTML =
    "Year: " + diabetesAgeSlider.value;
};
