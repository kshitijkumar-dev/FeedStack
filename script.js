const API_URL = "https://script.google.com/macros/s/AKfycbylp39qegnfcDCIbz69PMLTfmVdl8V31HA6r17E8Z-C6gtPpgo1Wc5TDPO8SaUzJlc/exec";

document.getElementById("feedbackForm")
.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: "Test",
    board: "ICSE",
    class: "X",
    maths: 5,
    science: 5,
    sst: 5,
    english: 5,
    discipline: 5,
    pace: 5,
    revision: 5,
    overall: 5,
    environmentRemark: "test",
    overallRemark: "test",
    teachers: [
      {
        name: "Nilesh Sir",
        clarity: 5,
        doubt: 5,
        engagement: 5,
        remark: "good"
      }
    ]
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const txt = await res.text();
  alert(txt);
});
