// swiper này dùng chung cho TOÀN BỘ website
document.querySelectorAll("[data-swiper]").forEach((wrapper) => {
  const swiperEl = wrapper.querySelector(".swiper");
  if (!swiperEl) return;

  new Swiper(swiperEl, {
    loop: wrapper.dataset.loop === "true",
    speed: Number(wrapper.dataset.speed) || 1000,
    spaceBetween: Number(wrapper.dataset.space) || 0,
    effect: wrapper.dataset.effect || "slide",

    navigation: {
      nextEl: wrapper.dataset.next,
      prevEl: wrapper.dataset.prev,
    },

    pagination: wrapper.dataset.pagination
      ? {
          el: wrapper.dataset.pagination,
          clickable: true,
        }
      : false,

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

