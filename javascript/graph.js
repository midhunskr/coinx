//  ChartJS

function updateChart(){
  async function fetchData(){
    const url = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=MARKET_INDEXES&country=us&language=en';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '059ebac8e5mshf017ad7b5491299p1fbfecjsndff6921df76c',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
    
    const response = await fetch(url, options)
    const datapoints = await response.json()
    return datapoints
  }

  fetchData().then(datapoints =>{
    const price = datapoints.data.trends.map(function(index){
      return index.price
    })

    const length = 5
    const company = datapoints.data.trends.map(function(index){
      return index.name.substring(0, length)
    })

    const previousClose = datapoints.data.trends.map(function(index){
      return index.previous_close
    })

    
    myChart.config.data.labels = company
    myChart.config.data.datasets[0].data = price
    myChart.config.data.datasets[1].data = previousClose
    myChart.update()
  })
}


//Data Block
const data = {
  labels: [],
  datasets: [{
    label: 'Price',
    data: [],
    borderRadius: 3,
    backgroundColor: "#00acee",
  }, {
    label: 'Previous Close',
    data: [],
    borderRadius: 3,
    backgroundColor: "#2DA94F"
  }]
}

//Config Block
const config = {
  data,
  type: 'bar',
  options: {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}

//Render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
)