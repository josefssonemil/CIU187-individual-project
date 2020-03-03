let foodChart;

const PASTRY_COLOR = "rgb(249,131,20)";
const CANDY_COLOR = "rgb(255, 99, 132)";
const SOFTDRINKS_COLOR = "rgb(30,144,255)";

const PASTRY_CAKES_BUNS = "Pastry/cakes/buns";
const COCOA_DRINKS = "Cocoa-powder/chocolate sauces/chocolate drinks";
const CANDY = "Chocolate and candy";
const SOFT_DRINKS = "Soft drinks";

const drawFoodChart = data => {
  const Y_VALUE = 10;
  const START_YEAR = 1960;
  const bubbleChartData = {
    xLabels: [PASTRY_CAKES_BUNS, CANDY, SOFT_DRINKS],
    datasets: [
      // x is Category
      // y is a constant
      // r is the value of the current year
      {
        label: PASTRY_CAKES_BUNS,
        backgroundColor: PASTRY_COLOR,
        borderColor: PASTRY_COLOR,
        data: [
          {
            x: PASTRY_CAKES_BUNS,
            y: Y_VALUE,
            r: data.buns[START_YEAR],
            vals: data.buns
          }
        ],
        fill: false
      },
      {
        label: SOFT_DRINKS,
        backgroundColor: SOFTDRINKS_COLOR,
        borderColor: SOFTDRINKS_COLOR,
        data: [
          {
            x: SOFT_DRINKS,
            y: Y_VALUE,
            r: data.softDrinks[START_YEAR],
            vals: data.softDrinks
          }
        ],
        fill: false
      },
      {
        label: CANDY,
        backgroundColor: CANDY_COLOR,
        borderColor: CANDY_COLOR,
        data: [
          { x: CANDY, y: Y_VALUE, r: data.candy[START_YEAR], vals: data.candy }
        ],
        fill: false
      }
    ]
  };

  const tooltipsOptions = {
    callbacks: {
      label: (tooltipItem, data) => {
        const item = data.datasets[tooltipItem.datasetIndex];
        const label = item && item.label;
        const value = item && item.data[tooltipItem.index];
        const unit = label === "Soft drinks" ? "litres" : "kg";

        return `${label}: ${value.r} ${unit}`;
      }
    }
  };

  var fCtx = document.getElementById("foodChart").getContext("2d");
  foodChart = new Chart(fCtx, {
    // The type of chart we want to create
    type: "bubble",
    // The data for our dataset
    data: bubbleChartData,
    // Configuration options go here
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 20,
          right: 100,
          top: 30
        }
      },
      legend: {
        position: "bottom"
      },
      scales: {
        xAxes: [
          {
            type: "category",
            position: "bottom",
            ticks: {
              min: PASTRY_CAKES_BUNS,
              max: SOFT_DRINKS,
              fontStyle: "bold"
            }
          }
        ],
        yAxes: [
          {
            display: false
          }
        ]
      },
      tooltips: tooltipsOptions
    }
  });
};

const getCategorisedFoodData = data => ({
  buns: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[PASTRY_CAKES_BUNS]
    }),
    {}
  ),
  cocoaDrinks: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[COCOA_DRINKS]
    }),
    {}
  ),
  candy: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[CANDY]
    }),
    {}
  ),
  softDrinks: data.reduce(
    (acc, currVal) => ({
      ...acc,
      [currVal.Year]: currVal[SOFT_DRINKS]
    }),
    {}
  )
});

const sliderOnChange = e => {
  const year = e.target.value;
  document.getElementById("year-text").innerHTML = "Year: " + year;
  updateFoodChart(year);
};

const updateFoodChart = year => {
  // Update the radius for each dataset's bubble
  foodChart.data.datasets.forEach(dataset => {
    const newData = { ...dataset.data[0], r: dataset.data[0].vals[year] };
    dataset.data[0] = newData;
  });
  foodChart.update();
};

const getFoodData = async () => d3.csv("./sugarFood.csv");

export const init = async () => {
  const foodData = await getFoodData();
  const formattedFood = getCategorisedFoodData(foodData);
  drawFoodChart(formattedFood);

  const foodSlider = document.getElementById("foodSlider");
  foodSlider.addEventListener("input", e => sliderOnChange(e));
  document.getElementById("year-text").innerHTML = "Year: " + foodSlider.value;
};
