/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsSlideshowGallery = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsSlideshowGallery = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      // Selectors
      const $slideshowClassicParent = $section.find(".slideshow-classic");
      const $pageSelector = $(document).find(".static_page-section");
      const $sidebarSelector = $(document).find(".sidebar-section");
      const $slideshowClassicEl = $section
        .find("[data-slideshow-classic]")
        .removeClass("is-hidden");
      
      if ($sidebarSelector.length != 0) {
        var style = $pageSelector.css("marginLeft").replace("px", "");
        var width = $sidebarSelector.css("width").replace("px", "");
        var totalValue = parseInt(style) + parseInt(width) + 40;
        $slideshowClassicParent.css("margin-left", totalValue + "px");
        $slideshowClassicParent.css(
          "width",
          "calc(100% - " + totalValue + "px)"
        );
      }

      // Flickity options, defaults
      var options = {
        cellAlign: "left",
        wrapAround: true,
        adaptiveHeight: true,
        prevNextButtons: this.number_of_slides > 1 ? this.show_arrows : false,
        pageDots: this.number_of_slides > 1 ? this.show_nav_buttons : false,
        draggable: true,
        imagesLoaded: true,
        fade: this.image_transition == "fade" ? true : false,
        autoPlay: this.image_slideshow_speed * 1000,
      };

      // disable draggable at 1200px
      if (matchMedia("screen and (min-width: 1200px)").matches) {
        options.draggable = false;
      }

      const $slideshowClassic = $slideshowClassicEl.flickity(options);

      // Resize flickity when the slider is settled
      $slideshowClassicEl.on("settle.flickity", function () {
        if ($sidebarSelector.length != 0) {
          var style = $pageSelector.css("marginLeft").replace("px", "");
          var width = $sidebarSelector.css("width").replace("px", "");
          var totalValue = parseInt(style) + parseInt(width) + 40;
        }
        $slideshowClassicEl.flickity("resize");
        if ($sidebarSelector) {
          $slideshowClassicParent.css("margin-left", totalValue + "px");
          $slideshowClassicParent.css(
            "width",
            "calc(100% - " + totalValue + "px)"
          );
        }
      });
    },
    blockSelect: function ($section, blockId) {
      const $slider = $section.find("[data-image-slideshow]");
      const $sliderIndex = $("#shopify-section-" + blockId).data("slide-index");

      $slider.flickity("select", $sliderIndex, true, true);
    },
    unload: function ($section) {},
  };

  /******/
})();
