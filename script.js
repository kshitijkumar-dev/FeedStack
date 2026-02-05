import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("feedbackForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const getRadio = name =>
    document.querySelector(`input[name="${name}"]:checked`).value;

  try{
    await addDoc(collection(db,"feedback"),{

      board: board.value,
      class: document.getElementById("class").value,
      name: name.value,
      subject: subject.value,
      teacher: teacher.value,

      clarity: getRadio("clarity"),
      engagement: getRadio("engagement"),
      doubt: getRadio("doubt"),

      teacherComment: teacherComment.value,

      discipline: getRadio("discipline"),
      pace: getRadio("pace"),
      revision: getRadio("revision"),

      environmentComment: environmentComment.value,

      finalSatisfaction: getRadio("final"),
      overallComment: overallComment.value,

      timestamp: serverTimestamp()
    });

    alert("Feedback Submitted Successfully!");
    document.getElementById("feedbackForm").reset();

  }catch(err){
    console.error(err);
    alert("Submission failed.");
  }

});
