<script>
const API_URL = "https://script.google.com/macros/s/AKfycbypwmxPUpVxFrb9vhHO-E2yQ6Qv3VOhl9Lv4HRfFwF49c6CZb7ZQjnvyUdDQwXQO55E/exec";

document.getElementById("feedbackForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const teachers = [];

  document.querySelectorAll(".teacher-block").forEach(block => {
    teachers.push({
      name: block.querySelector(".t-name").value,
      clarity: block.querySelector(".t-clarity").value,
      doubt: block.querySelector(".t-doubt").value,
      engagement: block.querySelector(".t-engagement").value,
      remark: block.querySelector(".t-remark").value
    });
  });

  const payload = {
    name: document.getElementById("studentName").value,
    board: document.getElementById("board").value,
    class: document.getElementById("class").value,

    maths: document.getElementById("maths").value,
    science: document.getElementById("science").value,
    sst: document.getElementById("sst").value,
    english: document.getElementById("english").value,

    discipline: document.getElementById("discipline").value,
    pace: document.getElementById("pace").value,
    revision: document.getElementById("revision").value,
    overall: document.getElementById("overall").value,

    environmentRemark: document.getElementById("envRemark").value,
    overallRemark: document.getElementById("overallRemark").value,

    teachers: teachers
  };

  console.log(payload);   // IMPORTANT

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const txt = await res.text();
  alert(txt);
});
</script>
