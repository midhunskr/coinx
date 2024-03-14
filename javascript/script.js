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

        _class("tab-indicator")[0].style.top = `calc(80px + ${i*50}px)`;

        _class("tab-content")[0].getElementsByClassName("active")[0].classList.remove("active");
        _class("tab-content")[0].getElementsByTagName("div")[i].classList.add("active");
    
    });
}


let api = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`
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
                let fromExchangeRate = data.rates[fromCurrency]
                let toExchangeRate = data.rates[toCurrency]
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

// const url = 'https://real-time-finance-data.p.rapidapi.com/stock-news?symbol=AAPL%3ANASDAQ&language=en';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '059ebac8e5mshf017ad7b5491299p1fbfecjsndff6921df76c',
// 		'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
// 	}
// };

// fetch(url, options)
//     .then(response => response.json())
//     .then(data => console.log(data))
