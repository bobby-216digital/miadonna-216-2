/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsHomeCollectionBlocks = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsHomeCollectionBlocks = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(
        ".jsHomeCollectionBlocks .home-collection-block--slider .collection-block"
      ).each((_, slider) => {
        $(slider).removeClass("is-hidden");
        $(slider).removeClass("is-tablet-hidden");
        $(slider).removeClass("is-mobile-hidden");
      });
      $(".jsHomeCollectionBlocks .home-collection-block--slider").each(
        (_, slider) => {
          const $homeCollectionSlider = $(slider);
          console.log($homeCollectionSlider);

          const slideData = {
            products_per_slide:
              $homeCollectionSlider.data("products-per-slide"),
            products_available:
              $homeCollectionSlider.data("products-available"),
            products_limit: $homeCollectionSlider.data("products-limit"),
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
            slideData.prevNextButtons = false;
          }

          $homeCollectionSlider.flickity({
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
          $homeCollectionSlider.on("settle.flickity", () =>
            $homeCollectionSlider.flickity("resize")
          );

          $(window).on("load", () => $homeCollectionSlider.flickity("resize"));
        }
      );
    },
    unload: function ($section) {},
  };

  /******/
})();
