import {
  LoadCsv,
  StartData,
  GetMostRecentMonthData,
  DisplayModal,
} from "./model.js";
import { StartMainView } from "./mainView.js";
import { initNavBar, initMyDataBtn, displayMyData } from "./navBarView.js";
import { initAddCsvFile } from "./addCsvView.js";
import { initModal } from "./modalView.js";

const moreInfo = document.querySelector("#moreInfo");

//function that initialize the program if there is already some data stored in the localstorage
export const init = function () {
  if (StartData()) {
    ShowData();
  } else {
    initModal();
  }
};

//when the DOM is loaded start the event listener
//(OBS: this was necessary because the event listeners were being set before the dom was created, that caused a lot of problems)
document.addEventListener("DOMContentLoaded", function () {
  initNavBar();
  initMyDataBtn();
  initAddCsvFile();
});

//display the data in the content
export const ShowData = function () {
  StartMainView(GetMostRecentMonthData());
  displayMyData();
};
