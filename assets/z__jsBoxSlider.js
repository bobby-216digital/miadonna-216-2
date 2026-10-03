/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsBoxsSlider = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsBoxsSlider = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(".jsBoxsSlider .box-slider").each((_, slider) => {
        const $boxSlider = $(slider);
        console.log($boxSlider);

        const slideData = {
          products_per_slide: $boxSlider.data("products-per-slide"),
          products_available: $boxSlider.data("products-available"),
          products_limit: $boxSlider.data("products-limit"),
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

        $boxSlider.flickity({
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
        });

        // Resize flickity when the slider is settled
        $boxSlider.on("settle.flickity", () =>
          $boxSlider.flickity("resize")
        );

        $(window).on("load", () => $boxSlider.flickity("resize"));
      });
    },
    unload: function ($section) {},
  };

  /******/
})();
