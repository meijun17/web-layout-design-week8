"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  // navbar
  var navbar_btn = $('.navbar-collapse-icon');
  var openMenu = false;
  var isSearch = false;

  function adjustWindowSize() {
    openMenu = false;
    navbar_btn.removeClass('fa-xmark');
    navbar_btn.addClass("fa-bars");
    $('.navbar-collapse').removeClass('show');

    if (isSearch) {
      mobileNavState();
      isSearch = false;
    }
  }

  function navbarToggle() {
    openMenu = !openMenu;

    if (openMenu) {
      navbar_btn.addClass('fa-xmark');
      navbar_btn.removeClass('fa-bars');
    } else {
      adjustWindowSize();
    }
  }

  function mobileNavState() {
    $('.search-bar').removeClass("d-block");
    $('.navbar-toggler ,.logo').removeClass('d-none');
  }

  $('#search-icon').click(function () {
    isSearch = !isSearch;
    $('.search-bar').addClass("d-block");
    $('.navbar-toggler , .logo').addClass('d-none');
  });
  $('#back-icon').click(function () {
    mobileNavState();
  });
  $('.navbar-toggler').click(function () {
    navbarToggle();
  });
  window.addEventListener("resize", adjustWindowSize); // swiper

  var option = {
    spaceBetween: 24,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };
  var swiper = new Swiper(".artistSwiper", _objectSpread(_objectSpread({}, option), {}, {
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      992: {
        slidesPerView: 3
      }
    }
  }));
  var otherSwiper = new Swiper(".otherSwiper", _objectSpread(_objectSpread({}, option), {}, {
    slidesPerView: 2,
    breakpoints: {
      992: {
        slidesPerView: 3
      },
      1296: {
        slidesPerView: 4
      }
    }
  }));
  var gridMasonry = document.querySelector(".grid-masonry");

  function masonry() {
    console.log('ok');
    var msnry = new Masonry(gridMasonry, {
      itemSelector: ".grid-masonry-item"
    });
    imagesLoaded(gridMasonry).on("progress", function () {
      msnry.layout();
    });
  } // artist瀑布流 tab 


  var tabs = document.querySelectorAll("button[data-bs-toggle=tab]");
  tabs.forEach(function (tab) {
    tab.addEventListener("shown.bs.tab", function () {
      masonry();
    });
  }); // 藝術品介紹 瀑布流

  var collapseBtn = document.querySelectorAll(".artworkInfo .masonry-content");
  collapseBtn.forEach(function (btn) {
    btn.addEventListener('hidden.bs.collapse', function () {
      masonry();
    });
    btn.addEventListener('shown.bs.collapse', function () {
      masonry();
    });
  });
  $('.collapse-btn').click(function () {
    $(this).children('.fa-solid').toggleClass('fa-angle-up');
    $(this).children('.fa-solid').toggleClass('fa-angle-down');
  });
  var priceCollapse = $('.price-item');
  priceCollapse.each(function (index, el) {
    el.addEventListener("click", function () {
      var priceBtn = $(el).children('.price-btn');
      var priceDetail = $(el).siblings('.price-detail');
      priceBtn.toggleClass('show');

      if (priceBtn.hasClass('show')) {
        priceDetail.removeClass('d-none');
      } else {
        priceDetail.addClass('d-none');
      }
    });
  });
});

function filterHandler() {
  $('.artworkSeries').addClass('d-none');
  $('.mobile-filter').removeClass('d-none');
}

function colseFilter() {
  $('.artworkSeries').removeClass('d-none');
  $('.mobile-filter').addClass('d-none');
}

function openWallet() {
  $('.mobile-wallet').removeClass('d-none');
  $('.main-content').addClass('d-none');
}

function closeWallet() {
  $('.mobile-wallet').addClass('d-none');
  $('.main-content').removeClass('d-none');
}
//# sourceMappingURL=all.js.map
