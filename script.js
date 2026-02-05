console.log("JS Connected");

let tCount = 1;

const addTeacherBtn = document.getElementById("addTeacher");
const teachersDiv = document.getElementById("teachers");

addTeacherBtn.addEventListener("click", () => {

  const firstBlock = teachersDiv.firstElementChild;
  const clone = firstBlock.cloneNode(true);

  clone.querySelectorAll("input[type=radio]").forEach(radio => {

    if (radio.name.includes("tclarity"))
      radio.name = "tclarity" + tCount;

    if (radio.name.includes("tdoubt"))
      radio.name = "tdoubt" + tCount;

    if (radio.name.includes("tengage"))
      radio.name = "tengage" + tCount;

    radio.checked = false;
  });

  clone.querySelector(".remark").value = "";

  teachersDiv.appendChild(clone);
  tCount++;
});
