const drawDiabetesChart = data => {
  let years = [];
  let amount = [];
  let men = [];
  let women = [];

  for (var i = 0; i < data.length; i++) {
    years.push(data[i]["Year"]);
    amount.push(data[i]["Amount"]);
    men.push(data[i]["Men"]);

    var temp = amount[i] - men[i];
    women.push(temp);
  }

  var dCtx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(dCtx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: years,
      datasets: [
        {
          label: "Men",
          backgroundColor: "rgb(30,144,255)",
          borderColor: "rgb(30,144,255)",
          data: men,
          stack: "diabetes-group"
        },
        // {
        //   label: "Total",
        //   backgroundColor: "rgb(105,105,105)",
        //   borderColor: "rgb(105,105,105)",
        //   data: amount,
        //   stack: "Total"
        // },
        {
          label: "Women",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: women,
          stack: "diabetes-group"
        }
      ]
    },

    // Configuration options go here
    options: {
      title: {
        display: true,
        text:
          "Number of patients with diabetes in Primary Healthcare (Sweden)"
      },
      scales: {
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });
};

const getDiabetesData = async () => d3.csv("/./datasets/diabetesPrimaryHealthcare.csv");

export const init = async () => {
  const diabetesData = await getDiabetesData();
  drawDiabetesChart(diabetesData);
};
