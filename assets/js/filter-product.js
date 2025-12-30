// --- MODAL & DROPDOWN TOGGLES ---
function toggleDropdown(id) {
  const el = document.getElementById(id);
  const isShown = el.classList.contains("show");
  document
    .querySelectorAll('[id$="DropdownDesktop"]')
    .forEach((d) => d.classList.remove("show"));
  if (!isShown) el.classList.add("show");
}

function showModal(id) {
  document.getElementById("mobileOverlay").classList.add("show");
  document.getElementById(id).classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeAllModals() {
  document.getElementById("mobileOverlay").classList.remove("show");
  document
    .querySelectorAll('[id$="ModalMobile"]')
    .forEach((m) => m.classList.remove("show"));
  document.body.style.overflow = "auto";
}

// Event Listeners for PC
document.getElementById("destToggleDesktop").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown("destDropdownDesktop");
});
document.getElementById("dateToggleDesktop").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown("dateDropdownDesktop");
});
document.getElementById("travToggleDesktop").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown("travDropdownDesktop");
});

// Event Listeners for Mobile
document.getElementById("destToggleMobile")?.addEventListener("click", () => {
  const modal = document.getElementById("destModalMobile");
  if (!modal) return;

  // 1️⃣ Lấy value hiện tại bên ngoài
  const currentValue =
    document.getElementById("destValueMobile")?.textContent?.trim() || "";

  // 2️⃣ Đẩy vào input trong popup
  const input = modal.querySelector("input[type='text']");
  if (input) {
    input.value =
      currentValue === "Where to?" ? "" : currentValue;
    input.focus();
  }

  // 3️⃣ Active đúng destination (nếu có)
  modal.querySelectorAll(".dest-option").forEach(opt => {
    opt.classList.toggle(
      "active",
      opt.dataset.value &&
        currentValue.includes(opt.dataset.value)
    );
  });

  // 4️⃣ Show modal
  showModal("destModalMobile");
});

document
  .getElementById("dateToggleMobile")
  .addEventListener("click", () => showModal("dateModalMobile"));
document
  .getElementById("travToggleMobile")
  .addEventListener("click", () => showModal("travModalMobile"));

document
  .querySelectorAll(".close-modal")
  .forEach((b) => b.addEventListener("click", closeAllModals));
document
  .getElementById("mobileOverlay")
  .addEventListener("click", closeAllModals);

// Click outside to close desktop dropdowns
window.addEventListener("click", () => {
  document
    .querySelectorAll('[id$="DropdownDesktop"]')
    .forEach((d) => d.classList.remove("show"));
});

// Destination Selection
document.querySelectorAll(".dest-option").forEach(opt => {
  opt.addEventListener("click", () => {
    const value = `${opt.dataset.value}, Vietnam`;

    // Update input trong modal
    const modal = opt.closest(".mobile-modal");
    const input = modal?.querySelector("input[type='text']");
    if (input) input.value = value;

    // Update text hiển thị
    document.getElementById("destValueMobile").textContent = value;
    document.getElementById("destValueDesktop").textContent = value;

    // Active state
    modal.querySelectorAll(".dest-option").forEach(o =>
      o.classList.remove("active")
    );
    opt.classList.add("active");
  });
});


// --- TRAVELERS COUNTER LOGIC ---
document.querySelectorAll(".increment, .decrement").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const counter = document.getElementById(btn.dataset.target);
    if (!counter) return;

    let val = parseInt(counter.textContent, 10) || 0;

    if (btn.classList.contains("increment")) val++;
    if (btn.classList.contains("decrement") && val > 0) val--;

    counter.textContent = val;
    updateTravelersDisplay();
  });
});

function updateTravelersDisplay() {
  const adultsDesktop =
    document.getElementById("adultsDesktop")?.textContent || "1";
  const roomsDesktop =
    document.getElementById("roomsDesktop")?.textContent || "1";

  const adultsMobile =
    document.getElementById("adultsMobile")?.textContent || adultsDesktop;
  const roomsMobile =
    document.getElementById("roomsMobile")?.textContent || roomsDesktop;

  // Desktop summary
  document.getElementById(
    "travValueDesktop"
  ).textContent = `${adultsDesktop} travelers, ${roomsDesktop} room`;

  // Mobile summary
  document.getElementById(
    "travValueMobile"
  ).textContent = `${adultsMobile} travelers, ${roomsMobile} room`;
}

// --- CALENDAR LOGIC ---
class DateCalendar {
  constructor(prefix) {
    this.prefix = prefix;
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.currentMonth1 = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1
    );
    this.selectedStart = null;
    this.selectedEnd = null;
    this.flexibleDays = 0;

    this.month1Title = document.getElementById(`month1Title${prefix}`);
    this.month2Title = document.getElementById(`month2Title${prefix}`);
    this.calendar1 = document.getElementById(`calendar1${prefix}`);
    this.calendar2 = document.getElementById(`calendar2${prefix}`);
    this.prevMonthBtn = document.getElementById(`prevMonth${prefix}`);
    this.nextMonthBtn = document.getElementById(`nextMonth${prefix}`);
    this.startDateEl = document.getElementById(`startDate${prefix}`);
    this.endDateEl = document.getElementById(`endDate${prefix}`);
    this.clearBtn = document.getElementById(`clearBtn${prefix}`);
    this.doneBtn = document.getElementById(`doneBtn${prefix}`);
    this.displayInput = document.getElementById(`dateValue${prefix}`);

    const quickBtnClass =
      prefix === "Desktop" ? ".desktop-quick-btn" : ".mobile-quick-btn";
    this.quickBtns = document.querySelectorAll(quickBtnClass);

    this.init();
  }

  init() {
    this.renderCalendars();
    this.updateDateDisplay();
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.prevMonthBtn) {
      this.prevMonthBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.currentMonth1 = new Date(
          this.currentMonth1.getFullYear(),
          this.currentMonth1.getMonth() - 1,
          1
        );
        this.renderCalendars();
      });
    }

    if (this.nextMonthBtn) {
      this.nextMonthBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.currentMonth1 = new Date(
          this.currentMonth1.getFullYear(),
          this.currentMonth1.getMonth() + 1,
          1
        );
        this.renderCalendars();
      });
    }

    this.quickBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.quickBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (btn.dataset.mode === "exact") {
          this.flexibleDays = 0;
          this.renderCalendars();
          this.updateDateDisplay();
          return;
        }

        this.flexibleDays = parseInt(btn.dataset.days, 10);
        if (!this.selectedStart) this.selectedStart = new Date(this.today);
        this.selectedEnd = this.addDays(this.selectedStart, this.flexibleDays);
        this.renderCalendars();
        this.updateDateDisplay();
      });
    });

    this.clearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.selectedStart = null;
      this.selectedEnd = null;
      this.flexibleDays = 0;
      this.quickBtns.forEach((b) => b.classList.remove("active"));
      this.quickBtns[0].classList.add("active");
      this.renderCalendars();
      this.updateDateDisplay();
    });

    this.doneBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.selectedStart) return;

      const startStr = this.formatDateShort(this.selectedStart);
      const endStr = this.selectedEnd
        ? this.formatDateShort(this.selectedEnd)
        : "";
      const finalStr = endStr ? `${startStr} - ${endStr}` : startStr;

      document.getElementById("dateValueDesktop").textContent = finalStr;
      document.getElementById("dateValueMobile").textContent = finalStr;

      if (this.prefix === "Mobile") closeAllModals();
      else toggleDropdown("dateDropdownDesktop");
    });
  }

  renderCalendars() {
    const nextMonth = new Date(
      this.currentMonth1.getFullYear(),
      this.currentMonth1.getMonth() + 1,
      1
    );
    this.renderCalendar(this.calendar1, this.currentMonth1);
    this.renderCalendar(this.calendar2, nextMonth);
    if (this.month1Title)
      this.month1Title.textContent = this.formatMonthYear(this.currentMonth1);
    if (this.month2Title)
      this.month2Title.textContent = this.formatMonthYear(nextMonth);
  }

  renderCalendar(container, month) {
    container.innerHTML = "";
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const lastDate = new Date(year, monthIndex + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const d = document.createElement("div");
      d.className = "day empty";
      container.appendChild(d);
    }

    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, monthIndex, i);
      const disabled = date < this.today;
      const day = document.createElement("div");
      day.className = "day";
      day.textContent = i;
      if (disabled) day.classList.add("disabled");
      if (this.isSameDay(date, this.today)) day.classList.add("today");
      if (this.selectedStart && this.isSameDay(date, this.selectedStart))
        day.classList.add("selected", "range-start");
      if (this.selectedEnd && this.isSameDay(date, this.selectedEnd))
        day.classList.add("selected", "range-end");
      if (
        this.selectedStart &&
        this.selectedEnd &&
        date > this.selectedStart &&
        date < this.selectedEnd
      )
        day.classList.add("in-range");

      if (!disabled) {
        day.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectDate(date);
        });
      }
      container.appendChild(day);
    }
  }

  selectDate(date) {
    if (!this.selectedStart || this.selectedEnd) {
      this.selectedStart = date;
      this.selectedEnd = null;
    } else {
      if (date < this.selectedStart) {
        this.selectedEnd = this.selectedStart;
        this.selectedStart = date;
      } else {
        this.selectedEnd = date;
      }
    }
    this.renderCalendars();
    this.updateDateDisplay();
  }

  updateDateDisplay() {
    this.startDateEl.textContent = this.selectedStart
      ? this.formatDate(this.selectedStart)
      : "Start date";
    this.endDateEl.textContent = this.selectedEnd
      ? this.formatDate(this.selectedEnd)
      : "End date";
  }

  formatDate(date) {
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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()}`;
  }

  formatDateShort(date) {
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
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  formatMonthYear(date) {
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

  isSameDay(d1, d2) {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }
}

// Initialize Calendars
const desktopCal = new DateCalendar("Desktop");
const mobileCal = new DateCalendar("Mobile");


document.querySelectorAll(".btn-clear-filter-location").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

    const modal = btn.closest(".mobile-modal");
    if (!modal) return;

    // 1️⃣ Clear input
    const input = modal.querySelector("input[type='text']");
    if (input) {
      input.value = "";
      input.focus();
    }

    // 2️⃣ Remove active state của destination
    modal.querySelectorAll(".dest-option.active").forEach(opt => {
      opt.classList.remove("active");
    });

    // 3️⃣ Clear value hiển thị bên ngoài (nếu có)
    const destDesktop = document.getElementById("destValueDesktop");
    const destMobile = document.getElementById("destValueMobile");

    if (destDesktop) destDesktop.textContent = "Where to?";
    if (destMobile) destMobile.textContent = "Where to?";

  });
});




// --- SECTION TABS FILTER ---
function initTabSwiper(wrapper) {
    const tabs = wrapper.querySelectorAll('[data-tab]');
    const swiperEl = wrapper.querySelector('.swiper');
    if (!tabs.length || !swiperEl) return;

    const slides = swiperEl.querySelectorAll('.swiper-slide');
    if (!slides.length) return;

    const swiperInstance = swiperEl.swiper;

    function filterSlides(type) {
        slides.forEach(slide => {
            slide.style.display =
                slide.dataset?.tab === type ? '' : 'none';
        });

        if (swiperInstance?.update) {
            swiperInstance.update();
        }
    }

    // filter lần đầu theo tab active
    const activeTab = wrapper.querySelector('[data-tab].active');
    if (activeTab?.dataset?.tab) {
        filterSlides(activeTab.dataset.tab);
    }

    // click tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (!tab.dataset?.tab) return;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            filterSlides(tab.dataset.tab);
        });
    });
}

// INIT TOÀN BỘ BLOCK
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-swiper-wrapper')
        .forEach(initTabSwiper);
});



