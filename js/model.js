import { ShowData } from "./controller";

let historico = [];
const state = {
  mostRecent: {
    name: [],
    percentage: [],
    price: [],
    qnt: [],
    total: [],
    balance: 0,
  },
  complexData: {
    gain: [],
    moment: [],
    balances: [],
  },
};

//receives a zero based number and return the name of the month
const translateMonth = function (n) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[n];
};

//checks the history and return the most recent month and its data
export const GetMostRecentMonthData = function () {
  let mostRecent = {};
  let dataArr = [];
  //finds the most recent month
  historico.reduce((latest, cur) => {
    if (
      latest ||
      new Date(cur[0]).getFullYear() > new Date(mostRecent[0]).getFullYear() ||
      new Date(cur[0]).getMonth() > new Date(mostRecent[0]).getMonth()
    )
      dataArr = cur;

    return false;
  }, true);

  if (dataArr.length === 0) {
    return;
  }

  const fiis = dataArr[1];
  const total = fiis.reduce((counter, cur) => {
    return counter + cur[3];
  }, 0);

  state.mostRecent.name = fiis.map((item) => item[1]);
  state.mostRecent.percentage = fiis.map((item) => (item[3] / total) * 100);
  state.mostRecent.total = fiis.map((item) => item[3]);
  state.mostRecent.qnt = fiis.map((item) => item[2]);
  state.mostRecent.price = state.mostRecent.total.map(
    (item, i) => item / state.mostRecent.qnt[i]
  );
  state.mostRecent.balance = state.mostRecent.total.reduce(
    (sum, cur) => sum + cur
  );

  return state.mostRecent;
};

//receives two dates and return true if they are the same month and same year
function isSameMonth(date1, date2) {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  ) {
    return true;
  }
  return false;
}

//get the needed data from local storage or start an empty array
export const StartData = function () {
  historico = JSON.parse(localStorage.getItem("historico"));
  if (historico === [] || historico === null) return false;
  return true;
};

//put the history in the localStorage
const saveHistorico = function () {
  localStorage.setItem("historico", JSON.stringify(historico));
};

//receive new information and checks if its usefull then saves it in the local storage
const addNewInfo = function (info) {
  const infoDate = info[0];
  let curIndex = -1;
  historico.forEach((item, index) => {
    const date = new Date(item[0]);
    //checks if its same month
    if (isSameMonth(infoDate, date)) {
      curIndex = index;
    }
  });
  if (curIndex === -1) {
    //add new month to the history
    historico.push(info);
  } else {
    historico[curIndex] = info;
  }
  saveHistorico();
};

//receives the csv file, parse and add new info to the page
export const LoadCsv = async function (csv) {
  try {
    const text = await csv.text();
    const lines = text.split("\n");
    const newInformation = [
      new Date(2021, 6),
      // csv.lastModifiedDate,
      [...filterAndCleanCsv(lines)],
    ];
    addNewInfo(newInformation);
  } catch (err) {
    throw err;
  }
};

// used to parse the csv file OBS: I could have used a library for this but it was nice to make it manualy
const filterAndCleanCsv = function (lines) {
  //remove " and split in the ;
  const cleanLine = lines.map((line) => line.replaceAll('"', "").split(";"));
  //keep only the lines with "FII" on index[0] and remove the " that came from the csv file
  const newLines = cleanLine
    .filter((line) => (line[0] === "FII" ? true : false))
    .map((line) => line.filter((item) => (item !== "" ? true : false)));
  //transfome into numbers
  const finalLines = newLines.map((line) => {
    return [
      line[0],
      line[1],
      Number(line[2].replace(",", ".")),
      parseFloat(line[3].split(" ")[1].replace(",", ".")),
    ];
  });
  return finalLines;
};

//function that sets the history with some fake data just to test the aplication
export const generateFakeData = function () {
  historico = JSON.parse(
    `[["2021-06-19T15:33:48.832Z",[["FII","GGRC11",2,240],["FII","HCTR11",3,408.75],["FII","MXRF11",16,164],["FII","RBRD11",5,302.35]]],["2021-07-01T03:00:00.000Z",[["FII","GGRC11",2,245.98],["FII","HCTR11",3,400.34],["FII","MXRF11",16,156.72],["FII","RBRD11",5,400.9]]], ["2021-08-01T03:00:00.000Z",[["FII","GGRC11",2,290.98],["FII","HCTR11",3,350.34],["FII","MXRF11",16,156.72],["FII","RBRD11",5,200.9]]], ["2021-09-01T03:00:00.000Z",[["FII","GGRC11",2,255.98],["FII","HCTR11",3,420.34],["FII","MXRF11",16,176.72],["FII","RBRD11",5,500.9]]]]`
  );
  saveHistorico();
  ShowData();
};

//used to read the history and generate more complex data
export const generateMoreData = function () {
  historico.forEach(function (monthData, index) {
    if (!historico[index + 1]) return;
    state.complexData.balances.push(
      getBalance(historico[index + 1][1]).toFixed(2)
    );
    state.complexData.gain.push(
      (getBalance(historico[index + 1][1]) - getBalance(monthData[1])).toFixed(
        2
      )
    );
    const theDate = new Date(historico[index + 1][0]);
    const month = theDate.getMonth();
    const year = theDate.getFullYear();
    state.complexData.moment.push(`${translateMonth(month)}, ${year}`);
  });
  return state.complexData;
};

//receive an array of arrays and return the sum of all item[3]
const getBalance = function (array) {
  return array.reduce((acc, item) => {
    return acc + Number(item[3]);
  }, 0);
};
