/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsCategoryCarousel = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsCategoryCarousel = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(".jsCategoryCarousel .category--carousel").each((_, slider) => {
        const $categoryCarousel = $(slider);
        console.log($categoryCarousel);

        const slideData = {
          products_per_slide: $categoryCarousel.data("products-per-slide"),
          products_available: $categoryCarousel.data("products-available"),
          products_limit: $categoryCarousel.data("products-limit"),
          initialIndex: 0,
          cellAlign: "center",
          prevNextButtons: true,
          prevNextButtons: true,
          arrowShape: window.arrowShape,
        };

        if (
          slideData.products_available > slideData.products_per_slide &&
          slideData.products_limit > slideData.products_per_slide
        ) {
          slideData.watchCSS = false,
          slideData.draggable = true;
          slideData.prevNextButtons = true;
        } else {
          slideData.watchCSS = true,
          slideData.draggable = true;
          slideData.prevNextButtons = false;
        }

        $categoryCarousel.flickity({
          lazyLoad: 2,
          freeScroll: true,
          imagesLoaded: true,
          draggable: slideData.draggable,
          cellAlign: "left",
          pageDots: false,
          contain: true,
          wrapAround: true,
          watchCSS: slideData.watchCSS,
          prevNextButtons: slideData.prevNextButtons,
          initialIndex: slideData.initialIndex,
        });

        // Resize flickity when the slider is settled
        $categoryCarousel.on("settle.flickity", () =>
          $categoryCarousel.flickity("resize")
        );

        $(window).on("load", () => $categoryCarousel.flickity("resize"));
      });
    },
    unload: function ($section) {},
  };

  /******/
})();
