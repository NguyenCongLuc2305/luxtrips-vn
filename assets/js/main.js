//load footer
fetch("/assets/partials/footer.html")
            .then(res => res.text())
            .then(html => document.getElementById("footer").innerHTML = html);

// banner swiper
const swiper = new Swiper(".section-1-swiper .swiper", {
  loop: true,
  speed: 1000,
  effect: "slide",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// swiper for
const swiperHighlight = new Swiper(".highlight-swiper", {
  loop: true,
  speed: 1000,
  effect: "slide",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// banner swiper
const section4Swiper = new Swiper(".section-4-swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 40,
  effect: "slide",
  navigation: {
    nextEl: ".swiper4-next",
    prevEl: ".swiper4-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  },
});

const section5Swiper = new Swiper(".section-5-swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 40,
  effect: "slide",
  navigation: {
    nextEl: ".swiper5-next",
    prevEl: ".swiper5-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1199: { slidesPerView: 5 }
  },
});

const section6Swiper = new Swiper(".section-6-swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 40,
  effect: "slide",
  navigation: {
    nextEl: document.querySelector('.section-6-swiper .swiper6-next'),
    prevEl: document.querySelector('.section-6-swiper .swiper6-prev'),
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1199: { slidesPerView: 3 }
  },
});



// Back to top (tuỳ chọn)
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  if (window.scrollY > 500) {
    backToTop?.classList.add("show");
  } else {
    backToTop?.classList.remove("show");
  }
});

// Mobile menu toggle
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");
const mobileSidebar = document.getElementById("mobileSidebar");

openMenuBtn.addEventListener("click", () => {
  mobileSidebar.classList.add("active");
  menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeMenuBtn.addEventListener("click", () => {
  mobileSidebar.classList.remove("active");
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

menuOverlay.addEventListener("click", () => {
  mobileSidebar.classList.remove("active");
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// See more / See less functionality
const seeMoreButtons = document.querySelectorAll(".see-more-btn");

seeMoreButtons.forEach((button) => {
  const targetId = button.getAttribute("data-target");
  const targetList = document.getElementById(targetId);
  const allItems = targetList.querySelectorAll("li");

  // Store items that should be toggleable (index 4 and beyond)
  const toggleableItems = Array.from(allItems).slice(4);

  button.addEventListener("click", function () {
    const isExpanded = button.textContent.trim() === "See less";

    if (isExpanded) {
      // Collapse - add hidden class
      toggleableItems.forEach((item) => {
        item.classList.add("hidden");
      });
      this.textContent = "See more (less)";
    } else {
      // Expand - remove hidden class
      toggleableItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      this.textContent = "See less";
    }
  });
});

// Hot search keywords rotation
const hotKeywords = [
  "Hanoi Exclusive Day Trips",
  "Halong Bay Seaplane Trips",
  "Jetski",
  "Ninh Binh Private Trips",
  "Private Honeymoon Designs",
  "Luxury Trains",
  "Helicopter Tours",
  "Private Yacht Charter",
  "Spa Retreat Packages",
  "Mountain Trekking Adventures",
];

let currentKeywordIndex = 0;
const searchInput = document.getElementById("searchInput");

function rotateKeyword() {
  searchInput.placeholder = hotKeywords[currentKeywordIndex];
  currentKeywordIndex = (currentKeywordIndex + 1) % hotKeywords.length;
}

// Rotate keywords every 3 seconds
setInterval(rotateKeyword, 3000);

// Search popup functionality
const searchPopup = document.getElementById("searchPopup");

searchInput.addEventListener("focus", () => {
  searchPopup.classList.add("active");
});

// Close popup when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    searchPopup.classList.remove("active");
  }
});

// Handle tag clicks
document.querySelectorAll(".search-tag").forEach((tag) => {
  tag.addEventListener("click", (e) => {
    searchInput.value = e.target.textContent;
    searchPopup.classList.remove("active");
  });
});

// Prevent popup from closing when clicking inside it
searchPopup.addEventListener("click", (e) => {
  e.stopPropagation();
});
