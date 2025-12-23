//load footer
fetch("assets/partials/footer.html")
  .then((res) => res.text())
  .then((html) => (document.getElementById("footer").innerHTML = html));

// load header
fetch("assets/partials/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;

    const script = document.createElement("script");
    script.src = "assets/js/header.js";
    document.body.appendChild(script);
  });


// load popup booking
fetch("assets/partials/popup-booking.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("popup-booking").innerHTML = html;

    const script = document.createElement("script");
    script.src = "assets/js/popup-booking.js";
    document.body.appendChild(script);
  });


// load slide-img-navigation-pagination
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("slide-img-navigation-pagination");
  if (!container) return;

  fetch("assets/components/slide-img-navigation-pagination.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;

      const script = document.createElement("script");
      script.src = "assets/js/custom-swiper.js";
      document.body.appendChild(script);
    });
});


//// scroll tab 

document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', function () {
        const target = document.querySelector(this.dataset.scroll);
        if (!target) return;

        // scroll mượt
        target.scrollIntoView({ behavior: 'smooth' });

        // active class
        document.querySelectorAll('.scroll-nav .nav-link')
            .forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });
});


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
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = location.pathname.split("/").slice(-1)[0]; // lấy tên file hiện tại

  // Nếu đang ở trang chủ (thường là index.html hoặc rỗng)
  if (
    currentPage === "index.html" ||
    currentPage === "" ||
    currentPage === "/"
  ) {
    document.getElementById("home").classList.add("active");
  }
  // Nếu đang ở trends.html
  if (currentPage === "trends.html") {
    document.getElementById("trends").classList.add("active");
  }
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

// function toggleContent() {
//   const extraContent = document.getElementById("extraContent");
//   const btn = document.getElementById("seeMoreBtn");
//   const arrow = document.getElementById("arrow");

//   extraContent.classList.toggle("show");
//   arrow.classList.toggle("up");

//   if (extraContent.classList.contains("show")) {
//     btn.innerHTML =
//       'See less <span class="arrow up" id="arrow"><i class="fa-light fa-angle-right"></i></span>';
//   } else {
//     btn.innerHTML =
//       'See more <span class="arrow" id="arrow"><i class="fa-light fa-angle-right"></i></span>';
//   }
// }

// function toggleContent(btn) {
//   const wrapper = btn.closest(".toggle-wrapper");
//   const extraContent = wrapper.querySelector(".extra-content");
//   const arrow = btn.querySelector(".arrow");

//   extraContent.classList.toggle("show");
//   arrow.classList.toggle("up");

//   if (extraContent.classList.contains("show")) {
//     btn.childNodes[0].nodeValue = "See less ";
//   } else {
//     btn.childNodes[0].nodeValue = "See more ";
//   }
// }

function toggleContent(btn) {
  const wrapper = btn.closest(".toggle-wrapper");
  const extraContent = wrapper.querySelector(".extra-content");
  const arrow = btn.querySelector(".arrow");

  const isOpen = extraContent.classList.contains("show");

  if (isOpen) {
    // Đóng
    extraContent.style.height = extraContent.scrollHeight + "px";
    requestAnimationFrame(() => {
      extraContent.style.height = "0px";
    });
    extraContent.classList.remove("show");
    arrow.classList.remove("up");
    btn.childNodes[0].nodeValue = "See more ";
  } else {
    // Mở
    extraContent.classList.add("show");
    extraContent.style.height = extraContent.scrollHeight + "px";
    arrow.classList.add("up");
    btn.childNodes[0].nodeValue = "See less ";
  }
}

// Mobile Filter Modal
const mobileFilterBtn = document.getElementById("mobileFilterBtn");
const mobileFilterEl = document.getElementById("mobileFilterModal");

if (mobileFilterBtn && mobileFilterEl) {
  const mobileFilterModal = new bootstrap.Modal(mobileFilterEl);

  mobileFilterBtn.addEventListener("click", () => {
    mobileFilterModal.show();
  });
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

const sortDropdownToggle = document.getElementById("sortDropdownToggle");
const sortDropdownMenu = document.getElementById("sortDropdownMenu");
const sortSelectedText = document.getElementById("sortSelectedText");

if (sortDropdownToggle && sortDropdownMenu) {
  // Toggle dropdown
  sortDropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sortDropdownToggle.classList.toggle("active");
    sortDropdownMenu.classList.toggle("show");
  });

  // Handle option selection
  sortDropdownMenu.querySelectorAll(".sort-option").forEach((option) => {
    option.addEventListener("click", (e) => {
      const value = e.target.getAttribute("data-value");

      // Update selected text
      sortSelectedText.textContent = value;

      // Update active state
      sortDropdownMenu.querySelectorAll(".sort-option").forEach((opt) => {
        opt.classList.remove("active");
      });
      e.target.classList.add("active");

      // Close dropdown
      sortDropdownToggle.classList.remove("active");
      sortDropdownMenu.classList.remove("show");

      // Sort activities
      sortActivities(value);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !sortDropdownToggle.contains(e.target) &&
      !sortDropdownMenu.contains(e.target)
    ) {
      sortDropdownToggle.classList.remove("active");
      sortDropdownMenu.classList.remove("show");
    }
  });
}

// Clear Filters
const clearFiltersBtn = document.getElementById("clearFilters");
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    // Clear all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Apply filters (in this case, show all items)
    applyFilters();
  });
}

function sortActivities(sortType) {
  const grid = document.getElementById("activityGrid");
  const cards = Array.from(grid.children);

  cards.sort((a, b) => {
    // Get price from each card
    const priceA = parseFloat(
      a.querySelector(".price-label").textContent.replace(/[^\d.]/g, "")
    );
    const priceB = parseFloat(
      b.querySelector(".price-label").textContent.replace(/[^\d.]/g, "")
    );

    // Get rating from each card (count stars)
    const starsA = a.querySelectorAll(".stars").length;
    const starsB = b.querySelectorAll(".stars").length;

    switch (sortType) {
      case "Latest":
        return 0; // Keep current order for latest
      case "Oldest":
        return 0; // Reverse order for oldest
      case "Most Luxury":
        return priceB - priceA; // Highest price first
      case "Regular":
        return priceA - priceB; // Lowest price first
      case "Relevance":
      default:
        return 0; // Default order
    }
  });

  // Re-append sorted cards
  cards.forEach((card) => grid.appendChild(card));
}

// Filter Functionality
function applyFilters() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const activeFilters = Array.from(checkboxes).map((cb) =>
    cb.parentElement.textContent.trim()
  );

  const cards = document.querySelectorAll(".activity-card");

  if (activeFilters.length === 0) {
    // Show all cards if no filters selected
    cards.forEach((card) => {
      card.parentElement.style.display = "block";
    });
    return;
  }

  // This is a simplified filter - in production, you'd match against actual card data
  cards.forEach((card) => {
    card.parentElement.style.display = "block";
  });

  console.log("Active filters:", activeFilters);
}

// Listen to filter changes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

// Smooth scroll for pagination
document.querySelectorAll(".pagination .page-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// // Initialize tooltips if Bootstrap 5 is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   // Check if running on mobile
//   const isMobile = window.innerWidth < 992

//   // Auto-expand first filter section on desktop
//   if (!isMobile) {
//     const firstFilter = document.querySelector("#experiencesFilter")
//     if (firstFilter && !firstFilter.classList.contains("show")) {
//       new bootstrap.Collapse(firstFilter, { toggle: true })
//     }
//   }
// })

// Add loading state when sorting/filtering
function addLoadingState() {
  const grid = document.getElementById("activityGrid");
  grid.classList.add("loading");
  setTimeout(() => {
    grid.classList.remove("loading");
  }, 300);
}

// Enhance sort with loading state
const originalSort = sortActivities;
sortActivities = (sortType) => {
  addLoadingState();
  setTimeout(() => originalSort(sortType), 100);
};

// Enhance filter with loading state
const originalFilter = applyFilters;
applyFilters = () => {
  addLoadingState();
  setTimeout(() => originalFilter(), 100);
};
