// ==============================
// Firebase Imports
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ==============================
// 🔁 REPLACE WITH YOUR FIREBASE CONFIG
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
// ADD TEACHER BUTTON
// ==============================

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

  clone.querySelector("textarea").value = "";

  teachersDiv.appendChild(clone);
  tCount++;
});

// ==============================
// FORM SUBMIT
// ==============================

const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const getRadio = (name) =>
    document.querySelector(`input[name="${name}"]:checked`)?.value || "";

  let teachersArr = [];
  let selectedTeachers = new Set();
  let duplicateFound = false;

  document.querySelectorAll(".teacherBlock").forEach((block, i) => {

    const teacherName = block.querySelector(".teacher").value;

    if (selectedTeachers.has(teacherName)) {
      duplicateFound = true;
    }
    selectedTeachers.add(teacherName);

    teachersArr.push({
      name: teacherName,
      clarity: getRadio("tclarity" + i),
      doubtSolving: getRadio("tdoubt" + i),
      engagement: getRadio("tengage" + i),
      remark: block.querySelector("textarea").value
    });

  });

  if (duplicateFound) {
    alert("Each teacher can be evaluated only once.");
    return;
  }

  try {

    await addDoc(collection(db, "feedback"), {

      name: document.getElementById("name").value,
      board: document.getElementById("board").value,
      class: document.getElementById("class").value,

      subjects: {
        maths: getRadio("maths"),
        science: getRadio("science"),
        sst: getRadio("sst"),
        english: getRadio("english")
      },

      teachers: teachersArr,

      environment: {
        discipline: getRadio("discipline"),
        pace: getRadio("pace"),
        revision: getRadio("revision"),
        comment: document.getElementById("environmentComment").value
      },

      overallSatisfaction: getRadio("clarity"),
      overallComment: document.getElementById("overallComment").value,

      timestamp: serverTimestamp()
    });

    alert("Feedback Submitted Successfully");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Submission Failed");
  }
});
