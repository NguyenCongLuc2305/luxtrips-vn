
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

const section4SwiperProduct2 = new Swiper(
  "#section-4__product--group-2 .swiper",
  {
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
  }
);

const section4SwiperProduct3 = new Swiper(
  "#section-4__product--group-3 .swiper",
  {
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
  }
);

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


const section3SubProduct1Swiper = new Swiper("#section-3__sub-product-1--swiper .swiper", {
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 30,
  effect: "slide",
  navigation: {
    nextEl: document.querySelector(".sub-product-1--next"),
    prevEl: document.querySelector(".sub-product-1--prev"),
  },
  breakpoints: {
    0: { slidesPerView: 3 },
    992: { slidesPerView: 7 },
  },
});

// swiper này dùng chung cho TOÀN BỘ website
document.querySelectorAll("[data-swiper]").forEach((wrapper) => {
  const swiperEl = wrapper.querySelector(".swiper");

  if (!swiperEl) return;

  new Swiper(swiperEl, {
    loop: wrapper.dataset.loop === "true",
    speed: Number(wrapper.dataset.speed) || 1000,
    spaceBetween: Number(wrapper.dataset.space) || 30,
    effect: wrapper.dataset.effect || "slide",

    navigation: {
      nextEl: wrapper.dataset.next,
      prevEl: wrapper.dataset.prev,
    },

    breakpoints: {
      0: {
        slidesPerView: Number(wrapper.dataset.slidesMobile) || 1,
      },
      992: {
        slidesPerView: Number(wrapper.dataset.slidesDesktop) || 1,
      },
    },
  });
});
