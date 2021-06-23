import { init } from "./controller.js";

const dropdown = document.querySelector("#dropdown");
const myDataBtn = document.querySelector("#MyDataBtn");
const content = document.querySelector(".content");
const allitens = document.querySelectorAll(".item");
const myFiisPage = document.querySelector(".mainPage");
const myFiisBtn = document.querySelector("#myFiis");
const x = document.querySelector(".topnav");

//add event listener to the MyData btn
export const initMyDataBtn = function () {
  MyDataBtn.addEventListener("click", function (e) {
    if (!myDataBtn.classList.contains("active")) init();
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  });
};

//remove from all the itens in the navbar the class "active"
const inactiveAll = function () {
  allitens.forEach((item) => item.classList.remove("active"));
};

//init the dropdown in the navbar
export const initNavBar = function () {
  dropdown.addEventListener("click", function () {
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  });
};

//display the data in the content
export const displayMyData = function () {
  content.style.display = "flex";
  myFiisPage.style.display = "none";
  inactiveAll();
  myDataBtn.classList.add("active");
};
