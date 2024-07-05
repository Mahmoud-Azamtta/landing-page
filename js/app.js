/**
 * Define Global Variables
 */

const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const sectionHeaders = document.querySelectorAll("section h2");
const header = document.querySelector("main header");
const scrollTopBtn = document.querySelector(".scroll-top");

let lastScrollY = window.scrollY;
let scrollYBeforeBtn = window.scrollY;
let timeout;
let isHidden = false;

/**
 * End Global Variables
 * Start Helper Functions
 */

// remove hidden state class from the navbar class list
const removeHiddenState = () => {
  navbar.classList.remove("hidden");
  clearTimeout(timeout);
};

// highlight the current section's nav item
const setActiveNavItem = (sectionId) => {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active-nav-item");
    if (item.getAttribute("data-target") == sectionId) {
      item.classList.add("active-nav-item");
    }
  });

  if (window.scrollY < sections[0].offsetTop) {
    navItems.forEach((item) => {
      item.classList.remove("active-nav-item");
    });
  }
};

// highlight the current active section
const setActiveSection = (section, viewPort) => {
  section.classList.remove("section-active");
  if (viewPort < 150 && viewPort >= -150) {
    section.classList.add("section-active");
    setActiveNavItem(section.id);
  }
};

// show the sctoll top button
const setScrollTopVisible = (scrollTopBtn) => {
  scrollTopBtn.classList.add("scroll-top-visible");
};

// hide the scroll top button
const setScrollTopInvisible = (scrollTopBtn) => {
  scrollTopBtn.classList.remove("scroll-top-visible");
};

/**
 * End Helper Functions
 * Begin Main Functions
 */

// build the navbar
const buildNavbar = () => {
  let navElements = "";
  sectionHeaders.forEach((header, idx) => {
    navElements += `<li class="">
      <a class="nav-item" href="#${sections[idx].id}" data-target="${sections[idx].id}">${header.innerHTML}</a>
    </li>`;
  });

  navbar.innerHTML = navElements;
};

buildNavbar();

// Hide navbar handler function
const handleNavbarHide = () => {
  const scroll = window.scrollY;
  const duration = 2000;
  const offset = 250;

  if (scroll < sections[0].offsetTop) {
    removeHiddenState();
    return;
  }

  if (Math.abs(scroll - lastScrollY) > offset) {
    lastScrollY = scroll;
    removeHiddenState();
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      navbar.classList.add("hidden");
      isHidden = true;
    }, duration);
  }
};

// Add class 'active' to section when near top of viewport
const activeSectionHandler = () => {
  sections.forEach((section) => {
    const viewPort = Math.floor(section.getBoundingClientRect().top);
    setActiveSection(section, viewPort);
  });
};

// Scroll to anchor ID using scrollTo function
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });
  });
});

// scroll top button handler
const scrollTopBtnHandler = () => {
  const scroll = window.scrollY;

  if (scroll < scrollYBeforeBtn) {
    setScrollTopVisible(scrollTopBtn);
  } else {
    setScrollTopInvisible(scrollTopBtn);
  }
  scrollYBeforeBtn = scroll;
};

/**
 * End Main Functions
 * Begin Events
 */

window.addEventListener("scroll", () => {
  handleNavbarHide();
  activeSectionHandler();
  scrollTopBtnHandler();
});
navbar.addEventListener("mouseenter", () => {
  if (isHidden) navbar.classList.remove("hidden");
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
