let currentStep = 1;
const totalSteps = 6;

// Open/Close Popup
document.querySelectorAll(".open-booking-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("bookingOverlay").classList.add("active");
    document.getElementById("bookingPopup").classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closePopup() {
  document.getElementById("bookingOverlay").classList.remove("active");
  document.getElementById("bookingPopup").classList.remove("active");
  document.body.style.overflow = "auto";
}

document.getElementById("closePopup").addEventListener("click", closePopup);
document.getElementById("bookingOverlay").addEventListener("click", closePopup);

// Update Progress Bar
function updateProgressBar() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

// js custom select

document.querySelectorAll(".custom-select").forEach((select) => {
  const btn = select.querySelector(".select-btn");
  const menu = select.querySelector(".select-menu");

  if (!btn || !menu) return;

  const imgInBtn = btn.querySelector("img");
  const inputId = select.dataset.target;
  const hiddenInput = inputId ? document.getElementById(inputId) : null;

  // Toggle dropdown
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

  // Click item
  menu.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");

      // đổi icon
      if (img && imgInBtn) {
        imgInBtn.src = img.src;
      }

      // set value
      if (hiddenInput) {
        hiddenInput.value = item.dataset.value || "";
      }

      // active state
      menu
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("active"));
      item.classList.add("active");

      menu.classList.remove("open");
    });
  });
});

// click ngoài → đóng
document.addEventListener("click", () => {
  document
    .querySelectorAll(".custom-select .select-menu.open")
    .forEach((menu) => menu.classList.remove("open"));
});

// Validate Current Step
function validateStep(step) {
  switch (step) {
    case 1:
      return document.getElementById("destination").value.trim() !== "";
    case 2:
      return document.querySelector(".calendar-day.selected") !== null;
    case 3:
      return document.getElementById("travelGroup").value !== "";
    case 4:
      const budget = document.getElementById("budget").value !== "";
      const priority =
        document.querySelector('input[name="priority"]:checked') !== null;
      return budget && priority;
    case 5:
      return (
        document.querySelector('input[name="travelType"]:checked') !== null
      );
    case 6:
      const email = document.getElementById("email").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const phone = document.getElementById("phone-booking").value.trim();
      return (
        email !== "" && firstName !== "" && lastName !== "" && phone !== ""
      );
    default:
      return true;
  }
}

// Change Step
function changeStep(direction) {
  // Validate before moving forward
  if (direction === 1 && !validateStep(currentStep)) {
    alert("Please fill in all required fields before proceeding.");
    return;
  }

  const steps = document.querySelectorAll(".form-step");
  steps[currentStep - 1].classList.remove("active");

  currentStep += direction;

  if (currentStep < 1) currentStep = 1;
  if (currentStep > totalSteps) {
    showThankYouAndReload();
    return;
  }

  steps[currentStep - 1].classList.add("active");
  updateProgressBar();
  updateButtons();
}

function showThankYouAndReload() {
  // Show modal
  const popup = document.getElementById("bookingPopup");
  if (popup) {
    popup.classList.add("thankYouForm");
  }

  // Auto reload after 3 seconds
  setTimeout(() => {
    location.reload();
  }, 3000);
}

// Update Button States
function updateButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.style.visibility = currentStep === 1 ? "hidden" : "visible";
  nextBtn.textContent = currentStep === totalSteps ? "Submit" : "Next";

  // Enable/disable next button based on validation
  nextBtn.disabled = !validateStep(currentStep);
}

// Counter Functions
function updateCounter(id, change) {
  const element = document.getElementById(id);
  let value = parseInt(element.textContent);
  value += change;
  if (value < 0) value = 0;
  if (id === "tripDays" && value < 1) value = 1;
  element.textContent = value;

  // Update total people
  if (id !== "tripDays") {
    updateTotal();
  }

  updateButtons();
}

function updateTotal() {
  const adults = parseInt(document.getElementById("adults").textContent);
  const kids612 = parseInt(document.getElementById("kids612").textContent);
  const kids26 = parseInt(document.getElementById("kids26").textContent);
  const infants = parseInt(document.getElementById("infants").textContent);
  const total = adults + kids612 + kids26 + infants;
  document.getElementById("totalPeople").textContent = total;
}

// Calendar Functions
function selectDate(element) {
  document.querySelectorAll(".calendar-day.selected").forEach((day) => {
    day.classList.remove("selected");
  });
  element.classList.add("selected");
  updateButtons();
}

function changeMonth(direction) {
  // Simple implementation - you can expand this
  alert("Month navigation - to be implemented with actual calendar logic");
}

// Add event listeners for real-time validation
document.querySelectorAll('input[name="travelType"]').forEach((input) => {
  input.addEventListener("change", updateButtons);
});

document.getElementById("destination").addEventListener("input", updateButtons);
document
  .getElementById("travelGroup")
  .addEventListener("change", updateButtons);
document.getElementById("budget").addEventListener("change", updateButtons);

document.querySelectorAll('input[name="priority"]').forEach((input) => {
  input.addEventListener("change", updateButtons);
});

document.getElementById("email").addEventListener("input", updateButtons);
document.getElementById("firstName").addEventListener("input", updateButtons);
document.getElementById("lastName").addEventListener("input", updateButtons);
document.getElementById("phone-booking").addEventListener("input", updateButtons);

// Initialize
updateProgressBar();
updateButtons();


// select phone input
const phoneInput = document.querySelector("#phone-booking");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "vn", // mặc định Việt Nam
  separateDialCode: true, // hiện +84 riêng
  preferredCountries: ["vn", "us", "gb", "au"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js",
});
