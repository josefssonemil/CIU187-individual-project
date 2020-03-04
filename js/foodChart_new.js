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
          zoom: {
            enabled: true,
            mode: 'xy',
            drag: true,
            speed: 0.1,
            	drag: {
				 borderColor: 'rgba(225,225,225,0.3)',
				 borderWidth: 5,
				 backgroundColor: 'rgb(225,225,225)',
				 animationDuration: 1
			},
          },
          pan: {
              enabled: true,
              mode: 'xy'
          }
    }


    const plugins = {
        zoom: {
            // Container for pan options
            pan: {
                // Boolean to enable panning
                enabled: true,
    
                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                // A function that is called as the user is panning and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',
    
                rangeMin: {
                    // Format of min pan range depends on scale type
                    x: 1960,
                    y: 0,
                },
                rangeMax: {
                    // Format of max pan range depends on scale type
                    x: 2018,
                    y: 100
                },
    
                // Function called while the user is panning
                onPan: function({foodChart}) { console.log(`I'm panning!!!`); },
                // Function called once panning is completed
                onPanComplete: function({foodChart}) { console.log(`I was panned!!!`); }
            },
    
            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,
    
                // Enable drag-to-zoom behavior
                drag: true,
    
                mode: 'xy',
    
                rangeMin: {
                    // Format of min zoom range depends on scale type
                    x: null,
                    y: null
                },
                rangeMax: {
                    // Format of max zoom range depends on scale type
                    x: null,
                    y: null
                },
    
                // Speed of zoom via mouse wheel
                // (percentage of zoom on a wheel event)
                speed: 0.1,
    
                // Function called while the user is zooming
                onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                // Function called once zooming is completed
                onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
            }
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


function changeYearRange(newRange){

    console.log(foodChart.data);
    //foodChart.data.labels = newRange;
    
    //foodChart.update();
}

// Slider
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [1960, 2018],
    connect: true,
    range: {
        'min': 1960,
        'max': 2018
    }
});


// Slider for food chart
slider.noUiSlider.on('update', function (values, handle) {
    slider.innerHTML = values[handle];
  
    let xRange = slider.noUiSlider.get();
    console.log(xRange);
    let start = xRange[0];
    let end = xRange[1];
    
    let output = [];
  
    for (var i = start; i <= end; i++){
      output.push(i.toString());
    }
    console.log(output);
  
    changeYearRange(output);
  
  });
  
  document.getElementById('write-button').addEventListener('click', function () {
    slider.noUiSlider.reset();
  });


  