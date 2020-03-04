let foodChart;


const PASTRY_COLOR = "rgb(249,131,20)";
const CANDY_COLOR = "rgb(255, 99, 132)";
const SOFTDRINKS_COLOR = "rgb(30,144,255)";

const drawFoodChart = data => {

    let years = [];
    let pastry = [];
    let drinks = [];
    let candy = [];
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
                backgroundColor: PASTRY_COLOR,
                borderColor: PASTRY_COLOR,
                data: pastry
            },
            {
                label: "Soft drinks",
                backgroundColor: SOFTDRINKS_COLOR,
                borderColor: SOFTDRINKS_COLOR,
                data: drinks
            },
            {
                label: "Candy",
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
    //const formattedFood = getCategorisedFoodData(foodData);
    drawFoodChart(foodData);
  

  };
  