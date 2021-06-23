import { LoadCsv } from "./model.js";

const addFile = document.querySelector("#addCsv");

//add event listener to the addCsv btn
export const initAddCsvFile = function () {
  addFile.addEventListener("change", async function () {
    try {
      if (addFile.files[0]) LoadCsv(addFile.files[0]);
    } catch (err) {
      console.log(err);
    }
  });
};
