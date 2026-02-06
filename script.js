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
// FIREBASE CONFIG
// ==============================
const firebaseConfig = {
  apiKey: "YAIzaSyCAfKmUg2R9MwcgqmvVTpnmjjEF5pzqIx0",
  authDomain: "feed--stack.firebaseapp.com",
  projectId: "feed--stack",
  storageBucket: "feed--stack.firebasestorage.app",
  messagingSenderId: "G-VJPWBS3X5T",
  appId: "843233512892"
};

// ------------------ INIT ------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ------------------ DOM ------------------

const form = document.getElementById("feedbackForm");
const addTeacherBtn = document.getElementById("addTeacher");
const teachersDiv = document.getElementById("teachers");

let teacherCount = 1;


// ------------------ ADD TEACHER ------------------

addTeacherBtn.addEventListener("click", () => {

  const selected = [
    ...document.querySelectorAll(".teacher")
  ].map(t => t.value);

  if (selected.length >= 5) {
    alert("All teachers already added.");
    return;
  }

  const block = document.createElement("div");
  block.classList.add("teacherBlock");

  block.innerHTML = `
    <select class="teacher">
      <option>Nilesh Sir</option>
      <option>Vikas Sir</option>
      <option>Avanya Ma'am</option>
      <option>Amit Sir</option>
      <option>Amar Sir</option>
    </select>

    <p>Clarity</p>
    <div class="rating">
      <input type="radio" name="tclarity${teacherCount}" value="1">1
      <input type="radio" name="tclarity${teacherCount}" value="2">2
      <input type="radio" name="tclarity${teacherCount}" value="3">3
      <input type="radio" name="tclarity${teacherCount}" value="4">4
      <input type="radio" name="tclarity${teacherCount}" value="5">5
    </div>

    <p>Doubt Solving</p>
    <div class="rating">
      <input type="radio" name="tdoubt${teacherCount}" value="1">1
      <input type="radio" name="tdoubt${teacherCount}" value="2">2
      <input type="radio" name="tdoubt${teacherCount}" value="3">3
      <input type="radio" name="tdoubt${teacherCount}" value="4">4
      <input type="radio" name="tdoubt${teacherCount}" value="5">5
    </div>

    <p>Engagement</p>
    <div class="rating">
      <input type="radio" name="tengage${teacherCount}" value="1">1
      <input type="radio" name="tengage${teacherCount}" value="2">2
      <input type="radio" name="tengage${teacherCount}" value="3">3
      <input type="radio" name="tengage${teacherCount}" value="4">4
      <input type="radio" name="tengage${teacherCount}" value="5">5
    </div>

    <label>Teacher Remarks(if any)</label>
    <textarea></textarea>
  `;

  teachersDiv.appendChild(block);
  teacherCount++;

});


// ------------------ SUBMIT ------------------

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {

    // ---------- MAIN TABLE ----------

    const mainDoc = await addDoc(
      collection(db, "feedback_submissions"),
      {
        name: document.getElementById("name").value || "Anonymous",
        board: document.getElementById("board").value,
        class: document.getElementById("class").value,

        maths: document.querySelector('input[name="maths"]:checked')?.value,
        science: document.querySelector('input[name="science"]:checked')?.value,
        sst: document.querySelector('input[name="sst"]:checked')?.value,
        english: document.querySelector('input[name="english"]:checked')?.value,

        discipline: document.querySelector('input[name="discipline"]:checked')?.value,
        pace: document.querySelector('input[name="pace"]:checked')?.value,
        revision: document.querySelector('input[name="revision"]:checked')?.value,

        overall: document.querySelector('input[name="clarity"]:checked')?.value,
        environmentRemark: document.getElementById("environmentComment").value || "",
        overallRemark: document.getElementById("overallComment").value || "",

        createdAt: serverTimestamp()
      }
    );

    const submissionId = mainDoc.id;


    // ---------- TEACHERS TABLE ----------

    const blocks = document.querySelectorAll(".teacherBlock");

    for (let i = 0; i < blocks.length; i++) {

      const block = blocks[i];

      await addDoc(
        collection(db, "teacher_feedback"),
        {
          submissionId: submissionId,
          teacherName: block.querySelector(".teacher").value,
          clarity: block.querySelector(`input[name="tclarity${i}"]:checked`)?.value,
          doubtSolving: block.querySelector(`input[name="tdoubt${i}"]:checked`)?.value,
          engagement: block.querySelector(`input[name="tengage${i}"]:checked`)?.value,
          remark: block.querySelector("textarea").value || ""
        }
      );

    }

    alert("Feedback Submitted Successfully");
    form.reset();

  }
  catch (err) {
    console.error(err);
    alert("Submission Failed");
  }

});