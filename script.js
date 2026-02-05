// ==============================
// Firebase SDK Imports
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ==============================
// Firebase Config (REPLACE VALUES)
// ==============================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// ==============================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==============================
// CHECK JS LOAD
// ==============================
console.log("JS Loaded");

// ==============================
// ADD TEACHER BUTTON LOGIC
// ==============================

let tCount = 1;

const addTeacherBtn = document.getElementById("addTeacher");
const teachersDiv = document.getElementById("teachers");

addTeacherBtn.addEventListener("click", () => {

  console.log("Add Teacher clicked");

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

// ==============================
// FORM SUBMISSION
// ==============================

const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const getRadio = (name) => {
    return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
  };

  let teachersArr = [];

  document.querySelectorAll(".teacherBlock").forEach((block, i) => {
    teachersArr.push({
      name: block.querySelector(".teacher").value,
      clarity: getRadio("tclarity" + i),
      doubt: getRadio("tdoubt" + i),
      engagement: getRadio("tengage" + i),
      remark: block.querySelector(".remark").value
    });
  });

  try {

    await addDoc(collection(db, "feedback"), {

      board: document.getElementById("board").value,
      class: document.getElementById("class").value,
      name: document.getElementById("name").value,

      subjects: {
        maths: getRadio("maths"),
        science: getRadio("science"),
        sst: getRadio("sst"),
        english: getRadio("english")
      },

      teachers: teachersArr,
      timestamp: serverTimestamp()

    });

    alert("Feedback Submitted Successfully");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Submission Failed");
  }

});
