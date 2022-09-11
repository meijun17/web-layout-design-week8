$(function() {
  // navbar
  let navbar_btn =  $('.navbar-collapse-icon');
  let openMenu = false;
  let isSearch = false;

  function adjustWindowSize() {
    openMenu = false;
    navbar_btn.removeClass('fa-xmark');
    navbar_btn.addClass("fa-bars");
    
    $('.navbar-collapse').removeClass('show');
    if ( isSearch ){
      mobileNavState();
      isSearch = false;
    }
  }

  function navbarToggle(){
    openMenu = !openMenu;
    if ( openMenu ){
      navbar_btn.addClass('fa-xmark');
      navbar_btn.removeClass('fa-bars');
    }else{
      adjustWindowSize();
    }
  }

  function mobileNavState(){
     $('.search-bar').removeClass("d-block");
     $('.navbar-toggler ,.logo').removeClass('d-none');
  }

  $('#search-icon').click(function(){
    if ( $(window).width() > 974 ) return;
    isSearch = !isSearch;
    $('.search-bar').addClass("d-block");
    $('.navbar-toggler , .logo').addClass('d-none');
  })

  $('#back-icon').click(function(){
    mobileNavState();
  })

  $('.navbar-toggler').click(function(){
    navbarToggle();
  })

  window.addEventListener("resize", adjustWindowSize);

  
  // swiper
  const option = {
    spaceBetween: 24,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  const swiper = new Swiper(".artistSwiper", {
    ...option,
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
    },
  });

  const otherSwiper = new Swiper(".otherSwiper", {
    ...option,
    slidesPerView: 2,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      1296: {
        slidesPerView: 4,
      },
    },
  });

  const gridMasonry = document.querySelector(".grid-masonry");

  function masonry() {
    console.log('ok')
    const msnry = new Masonry(gridMasonry, {
      itemSelector: ".grid-masonry-item",
    });
    imagesLoaded(gridMasonry).on("progress", () => {
      msnry.layout();
    });
  }
  
  // artist瀑布流 tab 
  const tabs = document.querySelectorAll("button[data-bs-toggle=tab]");
  tabs.forEach(function (tab) {
    tab.addEventListener("shown.bs.tab", () => {
      masonry();
    });
  });

  // 藝術品介紹 瀑布流
  const collapseBtn = document.querySelectorAll(".artworkInfo .masonry-content");
  collapseBtn.forEach(function(btn){
      btn.addEventListener('hidden.bs.collapse', function () {
        masonry();
      });
      btn.addEventListener('shown.bs.collapse', function () {
        masonry();
      })
  })

  $('.collapse-btn').click(function(){
    $(this).children('.fa-solid').toggleClass('fa-angle-up');
    $(this).children('.fa-solid').toggleClass('fa-angle-down');
  })

  const priceCollapse = $('.price-item');
  priceCollapse.each(function(index, el){
    el.addEventListener("click",function(){
      let priceBtn =  $(el).children('.price-btn');
      let priceDetail = $(el).siblings('.price-detail');
      priceBtn.toggleClass('show');

      if ( priceBtn.hasClass('show') ){
        priceDetail.removeClass('d-none')
      }else{
        priceDetail.addClass('d-none')
      }
    })
  })
  
});

function filterHandler(){
  $('.artworkSeries').addClass('d-none');
  $('.mobile-filter').removeClass('d-none');
}

function colseFilter(){
  $('.artworkSeries').removeClass('d-none');
  $('.mobile-filter').addClass('d-none');
}

function openWallet(){
  $('.mobile-wallet').removeClass('d-none');
  $('.main-content').addClass('d-none');
}

function closeWallet(){
  $('.mobile-wallet').addClass('d-none');
  $('.main-content').removeClass('d-none');
}