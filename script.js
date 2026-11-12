const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation: open the menu and close it after a link is selected.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Pricing switch updates the Pro plan price between monthly and yearly billing.
const billingToggle = document.getElementById("billingToggle");
const proPrice = document.querySelector(".price-card-featured [data-month]");

billingToggle.addEventListener("click", () => {
  const yearly = billingToggle.getAttribute("aria-checked") !== "true";
  billingToggle.setAttribute("aria-checked", String(yearly));
  billingToggle.setAttribute(
    "aria-label",
    yearly ? "Switch to monthly billing" : "Switch to yearly billing"
  );
  proPrice.textContent = yearly ? proPrice.dataset.year : proPrice.dataset.month;
});

// Pricing plan buttons preselect the plan in the demo request message.
document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const message = document.getElementById("message");
    message.value = `I'm interested in the ${button.dataset.plan} plan.`;
  });
});

const form = document.getElementById("demoForm");
const successMessage = document.getElementById("formSuccess");

function setError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.toggle("input-invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const team = document.getElementById("teamSize");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const teamError = document.getElementById("teamError");

  const cleanName = name.value.trim();
  const cleanEmail = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let isValid = true;

  setError(name, nameError, "");
  setError(email, emailError, "");
  setError(team, teamError, "");

  if (cleanName.length < 2) {
    setError(name, nameError, "Please enter your name (at least 2 characters).");
    isValid = false;
  }
  if (!emailPattern.test(cleanEmail)) {
    setError(email, emailError, "Please enter a valid email address.");
    isValid = false;
  }
  if (!team.value) {
    setError(team, teamError, "Please select your team size.");
    isValid = false;
  }

  if (!isValid) {
    const firstInvalid = form.querySelector(".input-invalid");
    firstInvalid?.focus();
    successMessage.hidden = true;
    return;
  }

  // Front-end demo only: no personal information is sent to a server.
  successMessage.hidden = false;
  form.reset();
  successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Clear field-level errors as the visitor corrects their input.
["fullName", "email", "teamSize"].forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    input.classList.remove("input-invalid");
    input.setAttribute("aria-invalid", "false");
    const error = document.getElementById(
      id === "fullName" ? "nameError" : id === "email" ? "emailError" : "teamError"
    );
    error.textContent = "";
  });
});
