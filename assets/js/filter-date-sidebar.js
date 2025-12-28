// State
const today = new Date();
today.setHours(0, 0, 0, 0);
let currentMonth1 = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedStart = null;
let selectedEnd = null;
let flexibleDays = 0;

// DOM Elements
// const dateToggle = document.getElementById("dateToggle");
// const toggleIcon = document.getElementById("toggleIcon");
// const dateContent = document.getElementById("dateContent");
const dateDisplay = document.getElementById("dateDisplay");
const month1Title = document.getElementById("month1Title");
const month2Title = document.getElementById("month2Title");
const calendar1 = document.getElementById("calendar1");
const calendar2 = document.getElementById("calendar2");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
// const tabBtns = document.querySelectorAll(".tab-btn");
const quickBtns = document.querySelectorAll(".quick-btn");
const clearBtn = document.getElementById("clearBtn");
const doneBtn = document.getElementById("doneBtn");

// Initialize
// document.addEventListener("DOMContentLoaded", () => {
renderCalendars();
updateDateDisplay();
setupEventListeners();
// });

// Setup Event Listeners
function setupEventListeners() {
  // Toggle sidebar
  // dateToggle.addEventListener("click", () => {
  //   dateContent.classList.toggle("collapsed");
  //   toggleIcon.textContent = dateContent.classList.contains("collapsed")
  //     ? "+"
  //     : "−";
  // });

  // Month navigation
  prevMonthBtn.addEventListener("click", () => {
    currentMonth1 = new Date(
      currentMonth1.getFullYear(),
      currentMonth1.getMonth() - 1,
      1
    );
    renderCalendars();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth1 = new Date(
      currentMonth1.getFullYear(),
      currentMonth1.getMonth() + 1,
      1
    );
    renderCalendars();
  });

  // Tab switching
  // tabBtns.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     const tab = btn.dataset.tab;
  //     tabBtns.forEach((b) => b.classList.remove("active"));
  //     btn.classList.add("active");

  //     document
  //       .getElementById("calendarTab")
  //       .classList.toggle("active", tab === "calendar");
  //     document
  //       .getElementById("flexibleTab")
  //       .classList.toggle("active", tab === "flexible");
  //   });
  // });

  // Quick select buttons
  quickBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      quickBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Exact dates → giữ nguyên selection
      if (btn.dataset.mode === "exact") {
        flexibleDays = 0;
        renderCalendars();
        updateDateDisplay();
        return;
      }

      const days = parseInt(btn.dataset.days, 10);
      flexibleDays = days;

      // 🔥 START DATE LOGIC
      let baseDate;

      if (selectedStart) {
        baseDate = selectedStart;
      } else {
        // Chưa chọn → lấy hôm nay
        baseDate = new Date(today);
        selectedStart = baseDate;
      }

      // END = START + X DAYS
      selectedEnd = addDays(baseDate, days);

      renderCalendars();
      updateDateDisplay();
    });
  });

  // Action buttons
  clearBtn.addEventListener("click", () => {
    selectedStart = null;
    selectedEnd = null;
    flexibleDays = 0;

    quickBtns.forEach((b) => b.classList.remove("active"));
    quickBtns[0].classList.add("active");

    renderCalendars();
    updateDateDisplay();
  });

  doneBtn.addEventListener("click", () => {
    if (!selectedStart || !selectedEnd) {
      alert("Please select start and end dates");
      return;
    }

    console.log("Selected dates:", {
      start: selectedStart,
      end: selectedEnd,
      flexibleDays,
    });

    alert(
      `${formatDate(selectedStart)} → ${formatDate(selectedEnd)}${
        flexibleDays ? ` (±${flexibleDays} days)` : ""
      }`
    );
  });
}

// Render both calendars
function renderCalendars() {
  const nextMonth = new Date(
    currentMonth1.getFullYear(),
    currentMonth1.getMonth() + 1,
    1
  );

  renderCalendar(calendar1, currentMonth1);
  renderCalendar(calendar2, nextMonth);

  month1Title.textContent = formatMonthYear(currentMonth1);
  month2Title.textContent = formatMonthYear(nextMonth);
}

// Render a single calendar
function renderCalendar(container, month) {
  container.innerHTML = "";

  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDateOfMonth = lastDay.getDate();

  for (let i = 0; i < firstDayOfWeek; i++) {
    const day = document.createElement("div");
    day.className = "day empty";
    container.appendChild(day);
  }

  // Current month days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const date = new Date(year, monthIndex, i);
    const isDisabled = date < today;
    const day = createDayElement(i, date, false, isDisabled);
    container.appendChild(day);
  }

  const totalDaysSoFar = firstDayOfWeek + lastDateOfMonth;
  const remainingCells = 42 - totalDaysSoFar; // 6 rows of 7 days
  for (let i = 0; i < remainingCells; i++) {
    const day = document.createElement("div");
    day.className = "day empty";
    container.appendChild(day);
  }
}

// Create day element
function createDayElement(dayNum, date, otherMonth, disabled) {
  const day = document.createElement("div");
  day.className = "day";
  day.textContent = dayNum;

  if (disabled) day.classList.add("disabled");

  if (isSameDay(date, today)) {
    day.classList.add("today");
  }

  // Check if selected
  if (selectedStart && isSameDay(date, selectedStart)) {
    day.classList.add("selected", "range-start");
  }
  if (selectedEnd && isSameDay(date, selectedEnd)) {
    day.classList.add("selected", "range-end");
  }

  // Check if in range
  if (
    selectedStart &&
    selectedEnd &&
    date > selectedStart &&
    date < selectedEnd
  ) {
    day.classList.add("in-range");
  }

  // Click handler
  if (!disabled) {
    day.addEventListener("click", () => selectDate(date));
  }

  return day;
}

// Select date
function selectDate(date) {
  // Reset quick
  flexibleDays = 0;
  quickBtns.forEach((b) => b.classList.remove("active"));
  quickBtns[0].classList.add("active");

  if (!selectedStart || selectedEnd) {
    selectedStart = date;
    selectedEnd = null;
  } else {
    if (date < selectedStart) {
      selectedEnd = selectedStart;
      selectedStart = date;
    } else {
      selectedEnd = date;
    }
  }

  renderCalendars();
  updateDateDisplay();
}

// Update date display
function updateDateDisplay() {
  const startEl = document.getElementById("startDate");
  const endEl = document.getElementById("endDate");

  if (!selectedStart) {
    startEl.textContent = "Start date";
    endEl.textContent = "End date";
    return;
  }

  startEl.textContent = formatDate(selectedStart);

  if (selectedEnd) {
    endEl.textContent = formatDate(selectedEnd);
  } else {
    endEl.textContent = "End date";
  }
}

// Utility functions
function formatDate(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

function formatMonthYear(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

// Toggle filter sections icon rotation
document.querySelectorAll(".filter-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const icon = this.querySelector(".icon-toggle");
    if (!icon) return;

    const isExpanded = this.getAttribute("aria-expanded") === "true";

    icon.classList.toggle("fa-plus", !isExpanded);
    icon.classList.toggle("fa-minus", isExpanded);
  });
});

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
