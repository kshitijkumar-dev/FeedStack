const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxuTJUzvDD3lIQicWZl7KZv-HaJkfeZJA4Jr2JIFCQnnz4_wUdZhBloaPjp1qNai4Lx/exec";

document.getElementById("feedbackForm")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    const payload = {
      studentName: document.getElementById("name").value,
      maths: document.querySelector('input[name="maths"]:checked')?.value,
      science: document.querySelector('input[name="science"]:checked')?.value,
      sst: document.querySelector('input[name="sst"]:checked')?.value,
      english: document.querySelector('input[name="english"]:checked')?.value,

      teachers: {
        nilesh: document.querySelector('input[name="nilesh"]:checked')?.value,
        vikas: document.querySelector('input[name="vikas"]:checked')?.value,
        avanya: document.querySelector('input[name="avanya"]:checked')?.value,
        amit: document.querySelector('input[name="amit"]:checked')?.value,
        amar: document.querySelector('input[name="amar"]:checked')?.value
      }
    };

    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    alert("Feedback Submitted");
    document.getElementById("feedbackForm").reset();
});
