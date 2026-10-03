/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsRingSlider = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsRingSlider = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      // Look for an element with class 'product-recommendations'
      const $productRecommendations = $section.find(".product-recommendations");

      const progressCircle = $section.find(".autoplay-progress svg");
      const progressCircle2 = $section.find(
        ".autoplay-progress-new svg"
      );
      const progressContent = $section.find(".autoplay-progress span");
      let swiper = new Swiper(".mySwiper", {
        spaceBetween: 20,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        direction: "vertical",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
      });

      let swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            progressCircle2.style.setProperty("--progress", 1 - progress);
          },
        },
      });
      let swiper3 = new Swiper(".mySwiper3", {
        spaceBetween: 40,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
          },
        },
      });

      $(".swiper-nav-div .swiper-slide").click(function () {
        var id = $(this).attr("id");
        $(".mySwiper3 .swiper-slide").removeClass("swiper-slide-active");
        $(".mySwiper3")
          .find("." + id)
          .addClass("swiper-slide-active");
      });

      $(".counter").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-countto");
        countDuration = parseInt($this.attr("data-duration"));
        console.log($this, "this", countDuration, "==", countTo);
        $({ counter: $this.text() }).animate(
          {
            counter: countTo,
          },
          {
            duration: countDuration,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.counter));
            },
            complete: function () {
              $this.text(this.counter);
            },
          }
        );
      });
    },
    unload: function ($section) {},
  };

  /******/
})();

//  Initialize Swiper
// let swiper = new Swiper(".mySwiper", {
//   spaceBetween: 10,
//   slidesPerView: 4,
//   freeMode: true,
//   watchSlidesProgress: true,
// });

// let swiper2 = new Swiper(".mySwiper2", {
//   spaceBetween: 10,
//   slidesPerView: 1,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   thumbs: {
//     swiper: swiper,
//   },
// });
// let swiper3 = new Swiper(".mySwiper3", {
//   spaceBetween: 10,
//   slidesPerView: 1,
//   navigation: false,
//   thumbs: {
//     swiper: swiper,
//   },
// });
