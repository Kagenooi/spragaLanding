document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

window.onscroll = function () {
  const header = document.getElementById("header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

const body = document.querySelector("body");
const menuButton = document.querySelector(".menu_button");
const closeButton = document.querySelector(".mobile_menu_close");
const menu = document.querySelector(".mobile_menu");
const mobileNavBarItems = document.querySelectorAll(".mobile_nav_bar_item");

mobileNavBarItems.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("mobile_menu_show");
    body.classList.remove("overflow_hidden");
  });
});

menuButton.addEventListener("click", () => {
  menu.classList.add("mobile_menu_show");
  body.classList.add("overflow_hidden");
});

closeButton.addEventListener("click", () => {
  menu.classList.remove("mobile_menu_show");
  body.classList.remove("overflow_hidden");
});
