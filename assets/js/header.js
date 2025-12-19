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
  if (!targetId) return;

  const targetList = document.getElementById(targetId);
  if (!targetList) return; // ⬅️ FIX LỖI

  const allItems = targetList.querySelectorAll("li");

  const toggleableItems = Array.from(allItems).slice(4);

  button.addEventListener("click", function () {
    const isExpanded = button.textContent.trim() === "See less";

    toggleableItems.forEach((item) => {
      item.classList.toggle("hidden", isExpanded);
    });

    this.textContent = isExpanded ? "See more (less)" : "See less";
  });
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
