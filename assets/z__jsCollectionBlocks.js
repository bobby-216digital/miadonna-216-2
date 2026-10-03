/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsCollectionBlocks = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsCollectionBlocks = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(".jsCollectionBlocks .collection-block--slider").each((_, slider) => {
        const $relatedSlider = $(slider);
        console.log($relatedSlider);

        const slideData = {
          products_per_slide: $relatedSlider.data("products-per-slide"),
          products_available: $relatedSlider.data("products-available"),
          products_limit: $relatedSlider.data("products-limit"),
          initialIndex: 0,
          cellAlign: "left",
          prevNextButtons: true,
          prevNextButtons: true,
          arrowShape: window.arrowShape,
        };

        if (
          slideData.products_available > slideData.products_per_slide &&
          slideData.products_limit > slideData.products_per_slide
        ) {
          (slideData.watchCSS = false), (slideData.draggable = true);
          slideData.prevNextButtons = true;
        } else {
          (slideData.watchCSS = true), (slideData.draggable = true);
          slideData.prevNextButtons = true;
        }

        $relatedSlider.flickity({
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
        $relatedSlider.on("settle.flickity", () =>
          $relatedSlider.flickity("resize")
        );

        $(window).on("load", () => $relatedSlider.flickity("resize"));
      });
    },
    unload: function ($section) {},
  };

  /******/
})();
