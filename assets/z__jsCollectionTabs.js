/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsCollectionTabs = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsCollectionTabs = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      $(".js-related-products-slider .products-slider .product-item").each(
        (_, slider) => {
          $(slider).removeClass("is-hidden");
          $(slider).removeClass("is-mobile-hidden");
        }
      );
      $(".js-related-products-slider .products-slider").each((_, slider) => {
        const $relatedSlider = $(slider);
        // console.log($relatedSlider);

        const slideData = {
          products_per_slide: $relatedSlider.data("products-per-slide"),
          products_available: $relatedSlider.data("products-available"),
          products_limit: $relatedSlider.data("products-limit"),
          initialIndex: 0,
          cellAlign: "left",
          wrapAround: true,
          prevNextButtons: true,
        };

        if (
          slideData.products_available > slideData.products_per_slide &&
          slideData.products_limit > slideData.products_per_slide
        ) {
          slideData.wrapAround = true;
        } else {
          slideData.wrapAround = false;
        }
        if (matchMedia("screen and (max-width: 575px)").matches) {
          slideData.groupCells = "60%";
        } else {
          slideData.groupCells = false;
        }

        if (
          slideData.products_available < slideData.products_per_slide ||
          slideData.products_limit < slideData.products_per_slide
        ) {
          $relatedSlider.addClass("container is-justify-center");
          $relatedSlider.find(".gallery-cell").addClass("column");
        } else {
          $relatedSlider.flickity({
            lazyLoad: 2,
            freeScroll: true,
            imagesLoaded: true,
            draggable: true,
            cellAlign: "left",
            wrapAround: slideData.wrapAround,
            pageDots: false,
            contain: true,
            prevNextButtons: true,
            initialIndex: slideData.initialIndex,
            groupCells: slideData.groupCells,
          });

          // Resize flickity when the slider is settled
          $relatedSlider.on("settle.flickity", () =>
            $relatedSlider.flickity("resize")
          );

          $(window).on("load", () => $relatedSlider.flickity("resize"));
        }
      });
      
      $(".js-related-products-slider .products-slider .product-item").each(
        (index, slider) => {
          $(slider).removeAttr('aria-hidden');
        }
      );
    },
    unload: function ($section) {},
  };

  /******/
})();
