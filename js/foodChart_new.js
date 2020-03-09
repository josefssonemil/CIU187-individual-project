let foodChart, slider;
let originalData = [];
let years = [];
const START_YEAR = 1960;
const END_YEAR = 2018;
    
let pastry = [];
let drinks = [];
let candy = [];
const PASTRY_COLOR = "rgb(249,131,20)";
const CANDY_COLOR = "rgb(255, 99, 132)";
const SOFTDRINKS_COLOR = "rgb(30,144,255)";

const drawFoodChart = data => {

    for(var i=0; i < data.length; i++){
        years.push(data[i]["Year"]);
        pastry.push(data[i]["Pastry/cakes/buns"]);
        drinks.push(data[i]["Soft drinks"]);
        candy.push(data[i]["Chocolate and candy"]);
    }

    const inputData = {
        labels: years,
        datasets: [
            {
                label: "Pastry, cakes and buns",
                fill: false,
                backgroundColor: PASTRY_COLOR,
                borderColor: PASTRY_COLOR,
                data: pastry
            },
            {
                label: "Soft drinks",
                fill: false,
                backgroundColor: SOFTDRINKS_COLOR,
                borderColor: SOFTDRINKS_COLOR,
                data: drinks
            },
            {
                label: "Candy",
                fill: false,
                backgroundColor: CANDY_COLOR,
                borderColor: CANDY_COLOR,
                data: candy
            }
        ]
    
    }

    const options = {
        title: {
            display: true,
            text:
              "Consumption of different sugar rich foods and drinks (1960-2018)"
          },

          scales:{
              yAxes: [{
                  display: true,
                  labelString: "Consumption in kg or litres"
              }

              ],

              xAxes: [
                  {
                      display: true,
                      labelString: "Year"
                  }
              ]
          }
          
    }

    


    var ctx = document.getElementById("foodChart").getContext("2d");

    foodChart = new Chart(ctx, {
        type: 'line',
        data: inputData,
        options: options
    });
}


const getFoodData = async () => d3.csv("/./datasets/sugarFood.csv");

export const init = async () => {

    const foodData = await getFoodData();
    originalData = foodData;
    drawFoodChart(foodData);


  };





function changeYearRange(range){
    
    var newArray = originalData.filter(function (el) {
        return el.Year >=range[0] &&
               el.Year <= range[1];
      });
  

    let newYears = [];
    let newPastry = [];
    let newDrinks = [];
    let newCandy = [];


    for(var i=0; i < newArray.length; i++){
        newYears.push(newArray[i]["Year"]);
        newPastry.push(newArray[i]["Pastry/cakes/buns"]);
        newDrinks.push(newArray[i]["Soft drinks"]);
        newCandy.push(newArray[i]["Chocolate and candy"]);
    }


    const newData = {
        labels: newYears,
        datasets: [
            {
                label: "Pastry, cakes and buns",
                fill: false,
                backgroundColor: PASTRY_COLOR,
                borderColor: PASTRY_COLOR,
                data: newPastry
            },
            {
                label: "Soft drinks",
                fill: false,
                backgroundColor: SOFTDRINKS_COLOR,
                borderColor: SOFTDRINKS_COLOR,
                data: newDrinks
            },
            {
                label: "Candy",
                fill: false,
                backgroundColor: CANDY_COLOR,
                borderColor: CANDY_COLOR,
                data: newCandy
            }
        ]
    }

    foodChart.data.labels = newData.labels;

    foodChart.data.datasets = newData.datasets;

    foodChart.update();
  
}


slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [1960, 2018],
    step: 1,
    connect: true,
    range: {
        'min': 1960,
        'max': 2018
    }
});

    slider.noUiSlider.on('change', function (values, handle) {
        let xRange = slider.noUiSlider.get();
        let start = xRange[0];
        let end = xRange[1];
        let output = [];
        for (var i = start; i <= end; i++) {
            var temp = parseInt(i, 10);
            Math.trunc(temp);
            output.push(temp.toString());
        }
        document.getElementById("yearText").innerHTML = "Show for years: " + output[0] + " - " + output[output.length - 1];
        changeYearRange(xRange);
    });
      
      document.getElementById('write-button').addEventListener('click', function () {
        slider.noUiSlider.reset();
      });






  