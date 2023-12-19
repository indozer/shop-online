function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "";
}

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target.id);
  }
};



document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "914501b625ada2392ae6bad9e2c3292e";

  function formatDate(timestamp) {
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp * 1000);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } else {
      return "Invalid Date";
    }
  }

  function getExchangeRate(baseCurrency, targetCurrency, elementId) {
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const rate = Math.round(data.rates[targetCurrency]);
        const date = data.time_last_updated;

        const exchangeRateElement = document.getElementById(elementId);
        const exchangeRateText = `1 ${baseCurrency} = ${rate} ${targetCurrency} (обновлено ${formatDate(date)})`;
        exchangeRateElement.textContent = exchangeRateText;
      })
      .catch(error => {
        console.error("Ошибка при получении данных:", error);
        const exchangeRateElement = document.getElementById(elementId);
        exchangeRateElement.textContent = "Ошибка при получении данных";
      });
  }

  getExchangeRate("USD", "EUR", "exchange-rate1");
  getExchangeRate("EUR", "USD", "exchange-rate2");

  setInterval(function() {
    getExchangeRate("USD", "EUR", "exchange-rate1");
    getExchangeRate("EUR", "USD", "exchange-rate2");
  }, 5 * 60 * 1000);
});