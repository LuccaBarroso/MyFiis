import { generateFakeData } from "./model";

const modal = document.querySelector("#modal");
const buttonYes = document.querySelector("#btnYes");
const buttonNo = document.querySelector("#btnNo");
const buttonClose = document.querySelector("#btnClose");

//initialyze the pop up window
export const initModal = function () {
  modal.style.display = "flex";
  buttonNo.addEventListener("click", closeModal);
  buttonClose.addEventListener("click", closeModal);
  buttonYes.addEventListener("click", function () {
    closeModal();
    generateFakeData();
  });
};

//close pop up window
const closeModal = function () {
  modal.style.display = "none";
};
