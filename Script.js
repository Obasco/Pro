function updateTime() {
  const el = document.querySelector('[data-testid="test-user-time"]');
  if (el) {
    el.textContent = Date.now().toString();
  }
}

// Run immediately
updateTime();

// Update every 1 second (1000 ms)
setInterval(updateTime, 1000);

//Form Validation script

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const successMsg = document.getElementById("success-message");

  let isValid = true;

  // Clear old errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  if (name.value.trim() === "") {
    document.getElementById("error-name").textContent = "Full name is required.";
    isValid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value.trim() === "") {
    document.getElementById("error-email").textContent = "Email is required.";
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    document.getElementById("error-email").textContent = "Enter a valid email (e.g. name@example.com).";
    isValid = false;
  }

  if (subject.value.trim() === "") {
    document.getElementById("error-subject").textContent = "Subject is required.";
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    document.getElementById("error-message").textContent = "Message must be at least 10 characters.";
    isValid = false;
  }

  if (isValid) {
    try {
      const res = await fetch("https://formspree.io/f/xldpywpk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          subject: subject.value,
          message: message.value,
        }),
      });

      if (res.ok) {
        successMsg.hidden = false;
        successMsg.textContent = "✅ Message sent successfully!";
        e.target.reset();
      } else {
        successMsg.hidden = false;
        successMsg.textContent = "⚠️ Something went wrong. Try again later.";
      }
    } catch (error) {
      successMsg.hidden = false;
      successMsg.textContent = "⚠️ Network error. Please check your connection.";
    }
  } else {
    successMsg.hidden = true;
  }
});
