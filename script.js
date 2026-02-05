// 1️⃣ Firebase imports
import { initializeApp } from "...";
import { getFirestore, collection, addDoc, serverTimestamp } from "...";

// 2️⃣ Firebase config
const firebaseConfig = { ... };

// 3️⃣ Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==============================
// 4️⃣ ADD-TEACHER LOGIC  (PASTE HERE)
// ==============================

let tCount = 1;

document.getElementById("addTeacher").onclick = () => {
  const container = document.getElementById("teachers");
  const clone = container.firstElementChild.cloneNode(true);

  clone.querySelectorAll("input[type=radio]").forEach(r=>{
    if(r.name.includes("tclarity")) r.name = "tclarity"+tCount;
    if(r.name.includes("tdoubt")) r.name = "tdoubt"+tCount;
    if(r.name.includes("tengage")) r.name = "tengage"+tCount;
    r.checked = false;
  });

  clone.querySelector(".remark").value = "";
  container.appendChild(clone);
  tCount++;
};

// ==============================
// 5️⃣ FORM SUBMIT LOGIC  (PASTE BELOW)
// ==============================

document.getElementById("feedbackForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  // ---- Subject Ratings ----
  const getRadio = name =>
    document.querySelector(`input[name="${name}"]:checked`).value;

  // ---- Collect Teachers ----
  let teachersArr = [];

  document.querySelectorAll(".teacherBlock").forEach((block,i)=>{
    teachersArr.push({
      name: block.querySelector(".teacher").value,
      clarity: document.querySelector(`input[name="tclarity${i}"]:checked`).value,
      doubt: document.querySelector(`input[name="tdoubt${i}"]:checked`).value,
      engagement: document.querySelector(`input[name="tengage${i}"]:checked`).value,
      remark: block.querySelector(".remark").value
    });
  });

  // ---- Send to Firebase ----
  try{
    await addDoc(collection(db,"feedback"),{

      board: board.value,
      class: document.getElementById("class").value,
      name: name.value,

      subjects:{
        maths: getRadio("maths"),
        science: getRadio("science"),
        sst: getRadio("sst"),
        english: getRadio("english")
      },

      teachers: teachersArr,
      timestamp: serverTimestamp()
    });

    alert("Feedback Submitted Successfully!");
    document.getElementById("feedbackForm").reset();

  }catch(err){
    alert("Submission Failed");
    console.error(err);
  }

});
