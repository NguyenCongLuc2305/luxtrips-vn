//load footer
fetch("/assets/partials/footer.html")
  .then((res) => res.text())
  .then((html) => (document.getElementById("footer").innerHTML = html));

// Sticky pc
// window.addEventListener("scroll", function () {
//   const navbar = document.getElementById("headerSticky");
//   const placeholder = document.getElementById("navbarPlaceholder");
//   const navbarHeight = navbar.offsetHeight;
//   if (window.scrollY > 5) {
//     navbar.classList.add("sticky");
//     placeholder.style.height = navbarHeight + "px"; // GIỮ CHỖ KHÔNG GIẬT
//   } else {
//     navbar.classList.remove("sticky");
//     placeholder.style.height = "0px";
//   }
// });

// // sticky mobile
// window.addEventListener("scroll", function () {
//   const navbarMobile = document.getElementById("headerStickyMobile");
//   const placeholderMobile = document.getElementById("navbarPlaceholderMobile");
//   const navbarMobileHeight = navbarMobile.offsetHeight;
//   if (window.scrollY > 10) {
//     navbarMobile.classList.add("sticky");
//     placeholderMobile.style.height = navbarMobileHeight + "px"; // GIỮ CHỖ KHÔNG GIẬT
//   } else {
//     navbarMobile.classList.remove("sticky");
//     placeholderMobile.style.height = "0px";
//   }
// });

// mobileBottomNav
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const mobileBottomNav = document.getElementById("mobileBottomNav");
    const floatingActions = document.getElementById("floatingActions");

    if (mobileBottomNav && floatingActions) {
      if (scrollPosition > 100) {
        mobileBottomNav.classList.add("show");
        floatingActions.classList.add("show");
      } else {
        mobileBottomNav.classList.remove("show");
        floatingActions.classList.remove("show");
      }
    }
  });
});

// Scroll to top functionality
document.getElementById("scrollTop").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Chat button
document.getElementById("chatBtn").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Mở chat support");
});

// Save button
document.getElementById("saveBtn").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Xem danh sách đã lưu (10 items)");
});


/// demo chuyển icon với current page 
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = location.pathname.split("/").slice(-1)[0]; // lấy tên file hiện tại
    
    // Nếu đang ở trang chủ (thường là index.html hoặc rỗng)
    if (currentPage === "index.html" || currentPage === "" || currentPage === "/") {
        document.getElementById("home").classList.add("active");
    }
    // Nếu đang ở trends.html
    if (currentPage === "trends.html") {
        document.getElementById("trends").classList.add("active");
    }
});


// swiper
const swiper = new Swiper(".section-1-swiper .swiper", {
  loop: true,
  speed: 1000,
  effect: "slide",
  spaceBetween: 30,
  // Navigation cho PC
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Pagination cho mobile
  pagination: {
    el: ".swiper-pagination-section-1",
    clickable: true,
  },
});

// swiper for
const swiperHighlight = new Swiper(".section__2-swiper", {
  loop: true,
  speed: 1000,
  effect: "slide",
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination-section-2",
    clickable: true,
  },
});

var benefitsSwiper = new Swiper(".section-3-swiper", {
  loop: true,
  spaceBetween: 30,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 4,
    },
  },
});

/// product-2
const reviewsSwiper = new Swiper(".reviewsSwiper .swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next-review-product",
    prevEl: ".swiper-button-prev-review-product",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

// banner swiper
const section4Swiper = new Swiper("#section-4-swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: ".swiper4-next",
    prevEl: ".swiper4-prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    992: { slidesPerView: 4 },
  },
});

const section4SwiperProduct2 = new Swiper("#section-4__product--group-2 .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: ".swiper4__product-2--next",
    prevEl: ".swiper4__product-2--prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    992: { slidesPerView: 4 },
  },
});

const section4SwiperProduct3 = new Swiper("#section-4__product--group-3 .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: ".swiper4__product-3--next",
    prevEl: ".swiper4__product-3--prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    992: { slidesPerView: 4 },
  },
});

const product3Swiper = new Swiper("#product-3__swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: ".product-3__swiper--next",
    prevEl: ".product-3__swiper--prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    992: { slidesPerView: 4 },
  },
});

const section5Swiper = new Swiper(".section-5-swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: ".swiper5-next",
    prevEl: ".swiper5-prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    992: { slidesPerView: 5 },
  },
});

const section6Swiper = new Swiper(".section-6-swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: document.querySelector(".section-6-swiper .swiper6-next"),
    prevEl: document.querySelector(".section-6-swiper .swiper6-prev"),
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
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

// Tự động lấy hot keywords từ slide đầu tiên
const hotKeywords = Array.from(
  document.querySelectorAll("#hotSearches .search-tag")
).map((tag) => tag.textContent);

let index = 0;

// Lấy tất cả search inputs và popups
const searchInputs = document.querySelectorAll(".search-input");
const searchPopups = document.querySelectorAll(".search-popup");

// Xoay placeholder cho tất cả inputs
setInterval(() => {
  searchInputs.forEach((input) => {
    input.placeholder = hotKeywords[index];
  });
  index = (index + 1) % hotKeywords.length;
}, 3000);

// Xử lý từng search container
searchInputs.forEach((input, i) => {
  const popup = searchPopups[i];

  // Mở popup khi focus
  input.addEventListener("focus", () => {
    popup.classList.add("active");
  });

  // Xử lý click tag trong popup này
  popup.querySelectorAll(".search-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      input.value = tag.textContent;
      popup.classList.remove("active");
    });
  });
});

// Đóng tất cả popups khi click bên ngoài
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    searchPopups.forEach((popup) => {
      popup.classList.remove("active");
    });
  }
});

// Lấy tất cả search inputs và popups
const searchInputsHeader = document.querySelectorAll(".search-input-header");
const searchPopupsHeader = document.querySelectorAll(".search-popup-header");

// Xử lý từng search container
searchInputsHeader.forEach((input, i) => {
  const popup = searchPopupsHeader[i];

  // Mở popup khi focus
  input.addEventListener("focus", () => {
    popup.classList.add("active-popup-header");
  });

  // Xử lý click tag trong popup này
  popup.querySelectorAll(".search-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      input.value = tag.textContent;
      popup.classList.remove("active-popup-header");
    });
  });
});

// Đóng tất cả popups khi click bên ngoài
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container-header")) {
    searchPopupsHeader.forEach((popup) => {
      popup.classList.remove("active-popup-header");
    });
  }
});

// Lấy tất cả search inputs và popups
const searchInputsMobile = document.querySelectorAll(".search-input-mobile");
const searchPopupsMobile = document.querySelectorAll(".search-popup-mobile");

// Xử lý từng search container
searchInputsMobile.forEach((input, i) => {
  const popup = searchPopupsMobile[i];

  // Mở popup khi focus
  input.addEventListener("focus", () => {
    popup.classList.add("active-popup-mobile");
  });

  // Xử lý click tag trong popup này
  popup.querySelectorAll(".search-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      input.value = tag.textContent;
      popup.classList.remove("active-popup-mobile");
    });
  });
});

// Đóng tất cả popups khi click bên ngoài
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container-mobile")) {
    searchPopupsMobile.forEach((popup) => {
      popup.classList.remove("active-popup-mobile");
    });
  }
});
