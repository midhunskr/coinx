//_______________________________App Function___________________________________//
function _class(name) {
    return document.getElementsByClassName(name);
}

let tabPanes = _class("tab-header")
[0].getElementsByTagName("div");

for(let i=0; i<tabPanes.length;i++){
    tabPanes[i].addEventListener("click", function() {
        _class("tab-header")[0].getElementsByClassName("active")
        [0].classList.remove("active");
        tabPanes[i].classList.add("active");

        _class("tab-indicator")[0].style.top = `calc(150px + ${i*50}px)`;

        _class("tab-content")[0].getElementsByClassName("active")[0].classList.remove("active");
        _class("tab-content")[0].getElementsByTagName("div")[i].classList.add("active");
    
    });
}

function _class(name) {
    return document.getElementsByClassName(name);
    }
    
    let tabPanes2 = _class("tab-header2")
    [0].getElementsByTagName("div");
    
    for(let i=0; i<tabPanes2.length;i++){
        tabPanes2[i].addEventListener("click", function() {
            _class("tab-header2")[0].getElementsByClassName("active2")
            [0].classList.remove("active2");
            tabPanes2[i].classList.add("active2");
    
            _class("tab-indicator2")[0].style.left = `calc(55px + ${i*73}px)`;
    
            _class("tab-content")[0].getElementsByClassName("active2")[0].classList.remove("active2");
            _class("tab-content")[0].getElementsByTagName("div")[i].classList.add("active2");
        
        });
    }

//_______________________________Converter___________________________________//

let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
const countryInput1 = document.getElementById("country")
const countryInput2 = document.getElementById("country2")


// Creating dropdowns from Array [currencies]
currencies.forEach((currency) =>{
    const option = document.createElement("option")
    option.value = currency
    option.text = currency
    countryInput1.add(option)
})

currencies.forEach((currency) =>{
    const option = document.createElement("option")
    option.value = currency
    option.text = currency
    countryInput2.add(option)
})

// Setting default values
countryInput1.value = "USD"
countryInput2.value = "INR"

let convertCurrency = () => {
    // Creating References
    const result = document.querySelector("#output")
    const amount = document.querySelector("#amount").value
    const fromCurrency = countryInput1.value
    const toCurrency = countryInput2.value

    // if Amount input field is not empty
    if(amount.length != 0) {
        fetch(api)
            .then(response => response.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromCurrency]
                let toExchangeRate = data.conversion_rates[toCurrency]
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
            })
    } else {
        result.innerHTML = "No input!"
        result.style.color = "orange"
    }

}


const calculateButton =  document.querySelector("#convert-btn")
calculateButton.addEventListener("click", convertCurrency)

let resetButton = document.getElementById("reset-btn")
resetButton.addEventListener("click", reset)

function reset() {
    document.getElementById("country").value = "USD"
    document.getElementById("country2").value = "INR"
    let result = document.getElementById("output")
    result.innerHTML = 0
    result.style.color = "#00acee"
 }


 //_______________________________News___________________________________//

 function captureHeadline(){
    async function fetchData(){
      const url2 = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=MARKET_INDEXES&country=us&language=en';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '059ebac8e5mshf017ad7b5491299p1fbfecjsndff6921df76c',
          'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
      };
      
      const response = await fetch(url2, options)
      const datapoints = await response.json()
      return datapoints
    }
  
    fetchData().then(datapoints =>{
    //   const price = datapoints.data.trends.map(function(index){
    //     return index.price
    //   })
  
    //   const company = datapoints.data.trends.map(function(index){
    //     return index.name
    //   })
  
    //   const previousClose = datapoints.data.trends.map(function(index){
    //     return index.previous_close
    //   })
  
  
    //   myChart.config.data.labels = company
    //   myChart.config.data.datasets[0].data = price
    //   myChart.config.data.datasets[1].data = previousClose
    //   myChart.update()
    const length = 80
    const news1 = datapoints.data.news[0].article_title
    const news2 = datapoints.data.news[1].article_title
    const news3 = datapoints.data.news[2].article_title
    const news4 = datapoints.data.news[3].article_title

    // const img1 = datapoints.data.news[0].article_photo_url

    const date0 = datapoints.data.news[0].post_time_utc
    const date1 = datapoints.data.news[0].post_time_utc
    const date2 = datapoints.data.news[0].post_time_utc
    const date3 = datapoints.data.news[0].post_time_utc

    document.getElementById("headline0").innerHTML = ('"' + news1.substring(0, length) + '..."')
    document.getElementById("headline1").innerHTML = ('"' + news2.substring(0, length) + '..."')
    document.getElementById("headline2").innerHTML = ('"' + news3.substring(0, length) + '..."')
    document.getElementById("headline3").innerHTML = ('"' + news4.substring(0, length) + '..."')

    document.getElementById("date0").innerHTML = date0
    document.getElementById("date1").innerHTML = date1
    document.getElementById("date2").innerHTML = date2
    document.getElementById("date3").innerHTML = date3

    // document.getElementById("newsImg0").src = img1

    })
  }
  captureHeadline()
  