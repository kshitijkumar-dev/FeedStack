const form = document.getElementById("feedbackForm");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztAMhog3FYsqDkR7EuURMXpHNzzuNEmgwNOHgyvLeBzWud98NXqOc_e2Oujp0HMZaO/exec";

form.addEventListener("submit", function (e) {
  e.preventDefault();

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

    teacherName: document.querySelector(".teacher").value,

    clarity: document.querySelector('input[name="tclarity0"]:checked')?.value || "",
    doubt: document.querySelector('input[name="tdoubt0"]:checked')?.value || "",
    engagement: document.querySelector('input[name="tengage0"]:checked')?.value || "",

    teacherRemark: document.getElementById("teachercomment").value,
    environmentRemark: document.getElementById("environmentComment").value,
    overallRemark: document.getElementById("overallComment").value
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })
  .then(res => res.text())
  .then(() => {
    alert("Feedback Submitted Successfully");
    form.reset();
  })
  .catch(err => {
    alert("Submission Failed");
    console.error(err);
  });

});
