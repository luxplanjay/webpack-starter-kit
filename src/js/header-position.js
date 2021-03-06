const headerFixed = document.querySelector(".header");
const headerHeight = 230;
let howScroll = 60;
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if ((scrollTop > lastScrollTop) && (scrollTop > howScroll)) {
    headerFixed.style.top = -headerHeight + 'px';
  } else {
    headerFixed.style.top = 0;
    headerFixed.classList.add("js-modify-header");
  }
  if (window.pageYOffset === 0) {
    headerFixed.classList.remove("js-modify-header");
  }
  lastScrollTop = scrollTop;
}, { passive: true });
