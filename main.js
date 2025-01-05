/** @format */

let chartBarsContainer = document.querySelector(".chart__bars-container");
let maxBarHeight = 150;
let values = [];


fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const maxValue = Math.max(...data.map((element) => element.amount));

    data.forEach((element) => {
      values.push(element.amount);

      const barHeight = (element.amount * maxBarHeight) / maxValue;
      const barColor = element.amount === maxValue ? "hsl(186, 34%, 60%)" : "";

      chartBarsContainer.innerHTML += `
        <div class="chart__bar" style="height: ${barHeight}px; background-color: ${barColor}">
          <div class="chart__bar--label" style="display: none;">$${element.amount}</div>
          <div class="chart__bar--day">${element.day}</div>
        </div>`;
    });
  })
  .catch((error) => console.error("Error fetching data:", error));


chartBarsContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("chart__bar")) {
    let labelElement = e.target.querySelector(".chart__bar--label");
    if (labelElement) {
      labelElement.style.display = "block";
    }
  }
});

chartBarsContainer.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("chart__bar")) {
    let labelElement = e.target.querySelector(".chart__bar--label");
    if (labelElement) {
      labelElement.style.display = "none";
    }
  }
});
