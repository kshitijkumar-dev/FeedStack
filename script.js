const SHEET_URL = "https://script.google.com/macros/s/AKfycbz1_l_Z9NbBBcIF9JPLEl1QRSA1fJ1U82F_SfVbARxjOXqEVHUNKBTX2FTJQIZM_bif/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const teachers = [];

  document.querySelectorAll(".teacherBlock").forEach((block, i) => {
    teachers.push({
      name: block.querySelector(".teacher").value,
      clarity: block.querySelector(`input[name="tclarity${i}"]:checked`)?.value || "",
      doubt: block.querySelector(`input[name="tdoubt${i}"]:checked`)?.value || "",
      engagement: block.querySelector(`input[name="tengage${i}"]:checked`)?.value || "",
      remark: block.querySelector("textarea").value || ""
    });
  });

  const payload = {
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
    teachers: teachers
  };

  await fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  alert("Feedback Submitted");
  form.reset();
});
