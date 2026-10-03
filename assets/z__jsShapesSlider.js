/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsShapesSlider = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsShapesSlider = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(".jsShapesSlider .shapes--slider").each((_, slider) => {
        const $shapesSlider = $(slider);
        // console.log($shapesSlider);

        const slideData = {
          products_per_slide: $shapesSlider.data("products-per-slide"),
          products_available: $shapesSlider.data("products-available"),
          products_limit: $shapesSlider.data("products-limit"),
          initialIndex: 0,
          cellAlign: "left",
          watchCSS: false,
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

        $shapesSlider.flickity({
          lazyLoad: 2,
          freeScroll: true,
          imagesLoaded: true,
          draggable: slideData.draggable,
          cellAlign: "left",
          pageDots: false,
          contain: true,
          watchCSS: slideData.watchCSS,
          prevNextButtons: slideData.prevNextButtons,
          initialIndex: slideData.initialIndex,
        });

        // Resize flickity when the slider is settled
        $shapesSlider.on("settle.flickity", () =>
          $shapesSlider.flickity("resize")
        );

        $(window).on("load", () => $shapesSlider.flickity("resize"));
      });
      
      $(".jsShapesSlider .shapes--slider .shape").each(
        (index, slider) => {
          $(slider).removeAttr('aria-hidden');
        }
      );
    },
    unload: function ($section) {},
  };

  /******/
})();
