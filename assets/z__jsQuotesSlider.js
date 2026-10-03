/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsQuotesSlider = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsQuotesSlider = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(".jsQuotesSlider .quotes-slider .body-cell").each((_, slider) => {
        $(slider).removeClass("is-hidden");
      });

      $(".jsQuotesSlider .quotes-slider").each((_, slider) => {
        const $quotesSlider = $(slider);
        // console.log($quotesSlider);

        const slideData = {
          products_per_slide: $quotesSlider.data("products-per-slide"),
          products_available: $quotesSlider.data("products-available"),
          products_limit: $quotesSlider.data("products-limit"),
          initialIndex: 0,
          cellAlign: "left",
          pageDots: true,
          prevNextButtons: false,
          arrowShape: window.arrowShape,
        };

        if (
          slideData.products_available > slideData.products_per_slide &&
          slideData.products_limit > slideData.products_per_slide
        ) {
          slideData.draggable = true;
          slideData.pageDots = true;
        } else {
          slideData.draggable = false;
          slideData.pageDots = false;
        }

        $quotesSlider.flickity({
          lazyLoad: 2,
          freeScroll: true,
          imagesLoaded: true,
          draggable: slideData.draggable,
          cellAlign: "left",
          pageDots: false,
          contain: true,
          prevNextButtons: false,
          pageDots: slideData.pageDots,
          initialIndex: slideData.initialIndex,
          autoPlay: 5000,
        });

        // Resize flickity when the slider is settled
        $quotesSlider.on("settle.flickity", () =>
          $quotesSlider.flickity("resize")
        );

        $(window).on("load", () => $quotesSlider.flickity("resize"));
      });
    },
    unload: function ($section) {},
  };

  /******/
})();
