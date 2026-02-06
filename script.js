const form = document.getElementById("feedbackForm");
const teachersDiv = document.getElementById("teachers");
const addTeacherBtn = document.getElementById("addTeacher");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzx_qJvxkdd_SGr81X0J2K5DPsRrLNp-oR5eGW5O6iZfqeKtLiejqR_jgVLtGSu2rit/exec";

// ------------------ ADD TEACHER BLOCK ------------------

addTeacherBtn.addEventListener("click", () => {

  const count = document.querySelectorAll(".teacherBlock").length;

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
      <input type="radio" name="tclarity${count}" value="1">1
      <input type="radio" name="tclarity${count}" value="2">2
      <input type="radio" name="tclarity${count}" value="3">3
      <input type="radio" name="tclarity${count}" value="4">4
      <input type="radio" name="tclarity${count}" value="5">5
    </div>

    <p>Doubt Solving</p>
    <div class="rating">
      <input type="radio" name="tdoubt${count}" value="1">1
      <input type="radio" name="tdoubt${count}" value="2">2
      <input type="radio" name="tdoubt${count}" value="3">3
      <input type="radio" name="tdoubt${count}" value="4">4
      <input type="radio" name="tdoubt${count}" value="5">5
    </div>

    <p>Engagement</p>
    <div class="rating">
      <input type="radio" name="tengage${count}" value="1">1
      <input type="radio" name="tengage${count}" value="2">2
      <input type="radio" name="tengage${count}" value="3">3
      <input type="radio" name="tengage${count}" value="4">4
      <input type="radio" name="tengage${count}" value="5">5
    </div>

    <label>Teacher Remarks</label>
    <textarea class="teachercomment"></textarea>
  `;

  teachersDiv.appendChild(block);
});

// ------------------ SUBMIT ------------------

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const teachers = [];

  document.querySelectorAll(".teacherBlock").forEach((block, i) => {

    teachers.push({
      name: block.querySelector(".teacher").value,
      clarity: block.querySelector(`input[name="tclarity${i}"]:checked`)?.value || "",
      doubt: block.querySelector(`input[name="tdoubt${i}"]:checked`)?.value || "",
      engagement: block.querySelector(`input[name="tengage${i}"]:checked`)?.value || "",
      remark: block.querySelector(".teachercomment").value
    });

  });

  const payload = {

    name: document.getElementById("name").value,
    board: document.getElementById("board").value,
    class: document.getElementById("class").value,

    maths: document.querySelector('input[name="maths"]:checked')?.value || "",
    science: document.querySelector('input[name="science"]:checked')?.value || "",
    sst: document.querySelector('input[name="sst"]:checked')?.value || "",
    english: document.querySelector('input[name="english"]:checked')?.value || "",

    discipline: document.querySelector('input[name="discipline"]:checked')?.value || "",
    pace: document.querySelector('input[name="pace"]:checked')?.value || "",
    revision: document.querySelector('input[name="revision"]:checked')?.value || "",
    overall: document.querySelector('input[name="clarity"]:checked')?.value || "",

    environmentRemark: document.getElementById("environmentComment").value,
    overallRemark: document.getElementById("overallComment").value,

    teachers: teachers
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })
  .then(r => r.text())
  .then(() => {
    alert("Feedback Submitted Successfully");
    form.reset();
    teachersDiv.innerHTML = document.querySelector(".teacherBlock").outerHTML;
  })
  .catch(() => alert("Submission Failed"));
});
