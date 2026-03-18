const convertButton = document.querySelector("button")
const currencyFrom = document.querySelector(".currency-from")
const currencyTo = document.querySelector(".currency-select")
const inputCurrency = document.querySelector(".input-currency")

const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
const currencyValue = document.querySelector(".currency-value")

const currencyName = document.getElementById("currency-name")
const currencyImage = document.querySelector(".currency-image")

const currencyNameFrom = document.getElementById("currency-name-from")
const currencyImageFrom = document.querySelector(".currency-image-from")

async function getRates() {
    const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL")
    const data = await response.json()

    return {
        real: 1,
        dolar: Number(data.USDBRL.bid),
        euro: Number(data.EURBRL.bid),
        bitcoin: Number(data.BTCBRL.bid)
    }
}

const formats = {
    real: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    dolar: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    euro: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
}

function updatePlaceholder() {
    const from = currencyFrom.value

    if (from === "real") {
        inputCurrency.placeholder = "R$ 0,00"
    }

    if (from === "dolar") {
        inputCurrency.placeholder = "US$ 0.00"
    }

    if (from === "euro") {
        inputCurrency.placeholder = "€ 0,00"
    }

    if (from === "bitcoin") {
        inputCurrency.placeholder = "₿ 0.000000"
    }
}

async function convertValues() {
    const value = Number(inputCurrency.value)
    if (!value) return

    const from = currencyFrom.value
    const to = currencyTo.value

   
    currencyValue.innerHTML = "Carregando..."
    currencyValueToConvert.innerHTML = "..."

    try {
        const rates = await getRates()

        const valueInReal = value * rates[from]
        const finalValue = valueInReal / rates[to]

        if (from === "bitcoin") {
            currencyValueToConvert.innerHTML = value.toFixed(6) + " BTC"
        } else {
            currencyValueToConvert.innerHTML = formats[from].format(value)
        }

        if (to === "bitcoin") {
            currencyValue.innerHTML = finalValue.toFixed(6) + " BTC"
        } else {
            currencyValue.innerHTML = formats[to].format(finalValue)
        }

    } catch (error) {
        
        currencyValue.innerHTML = "❌ Erro ao carregar"
        currencyValueToConvert.innerHTML = "-"
        alert("Erro ao buscar moedas 😢")
        console.error(error)
       
    }
}

function updateCurrencyUI() {
    const from = currencyFrom.value
    const to = currencyTo.value

    if (from === "real") {
        currencyNameFrom.innerHTML = "Real Brasileiro"
        currencyImageFrom.src = "./assets/brasil 2.png"
    }

    if (from === "dolar") {
        currencyNameFrom.innerHTML = "Dólar Americano"
        currencyImageFrom.src = "./assets/Usa.png"
    }

    if (from === "euro") {
        currencyNameFrom.innerHTML = "Euro"
        currencyImageFrom.src = "./assets/Euro.png"
    }

    if (from === "bitcoin") {
        currencyNameFrom.innerHTML = "Bitcoin"
        currencyImageFrom.src = "./assets/bitcoin.png"
    }

    if (to === "real") {
        currencyName.innerHTML = "Real Brasileiro"
        currencyImage.src = "./assets/brasil 2.png"
    }

    if (to === "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/Usa.png"
    }

    if (to === "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/Euro.png"
    }

    if (to === "bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"
    }
}

function handleChange() {
    updateCurrencyUI()
    updatePlaceholder()
    convertValues()
    updatePlaceholder()
}

convertButton.addEventListener("click", convertValues)
currencyFrom.addEventListener("change", handleChange)
currencyTo.addEventListener("change", handleChange)