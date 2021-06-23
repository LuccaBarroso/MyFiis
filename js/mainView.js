import Chart from "chart.js/auto";
import { generateMoreData } from "./model";

const tabela = document.querySelector("#displayMainData");
const patrimonio = document.querySelector("#patrimonio");
const income = document.querySelector("#income");
const balanceG = document.querySelector("#balanceG");

// generate an array with n random colors
const generateColors = function (n) {
  let colors = [];
  for (let i = 0; i < n; i++) {
    colors.push(`#10${parseInt(Math.random() * 7999) + 1000}`);
  }
  return colors;
};

//generate the table with every investment
const gerarTabela = function (nome, porc, preco, qnt, total) {
  for (let i = 0; i < nome.length; i++) {
    const html = `
  
    <tr>
    
      <td><a href="https://www.fundsexplorer.com.br/funds/${nome[
        i
      ].toLowerCase()}" target="_blank" rel="noopener noreferrer">  ${
      nome[i]
    } </a></td>
     
      <td>${porc[i].toFixed(2)}%</td>
      <td>R$ ${preco[i].toFixed(2)}</td>
      <td>${qnt[i]}</td>
      <td>R$ ${total[i].toFixed(2)}</td>
    </tr>

    `;
    tabela.insertAdjacentHTML("beforeend", html);
  }
};

//generate the doughnut graph
const gerarGrafico = function (names, data) {
  const ctx = document.querySelector(".myPizzaChart");
  const doughnutGraph = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: names,
      datasets: [
        {
          label: "Fundos de Investimento",
          data: data,
          backgroundColor: generateColors(data.length),
          hoverOffset: 2,
          borderWidth: 0,
        },
      ],
    },
  });
};

export const StartMainView = function (mostRecent) {
  gerarGrafico(mostRecent.name, mostRecent.total);
  gerarTabela(
    mostRecent.name,
    mostRecent.percentage,
    mostRecent.price,
    mostRecent.qnt,
    mostRecent.total
  );
  patrimonio.insertAdjacentHTML("beforeend", mostRecent.balance.toFixed(2));
  const moreComplexData = generateMoreData();
  gerarIncome(moreComplexData);
  gerarBalance(moreComplexData);
};

//generate the graph with the income
const gerarIncome = function (moreComplexData) {
  const incomeChart = new Chart(income, {
    type: "bar",
    data: {
      labels: moreComplexData.moment,
      datasets: [
        {
          label: "R$",
          data: moreComplexData.gain,
          backgroundColor: generateColors(moreComplexData.gain.length),
          borderWidth: 0,
        },
      ],
    },
  });
};

//generate the graph with the balance
const gerarBalance = function (moreComplexData) {
  const balance = new Chart(balanceG, {
    type: "line",
    data: {
      labels: moreComplexData.moment,
      datasets: [
        {
          label: "R$ total",
          data: moreComplexData.balances,
          fill: false,
          backgroundColor: generateColors(1),
          borderWidth: 10,
        },
      ],
    },
  });
};
