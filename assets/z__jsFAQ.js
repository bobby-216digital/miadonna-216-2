/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsFAQ = {
    init() {
      const $faqHeading = $(
        ".faq-accordion > .faq-accordion-items > .faq-accordion-item > dt > button"
      );

      $(
        ".faq-accordion > .faq-accordion-items > .faq-accordion-item > dd"
      ).attr("aria-hidden", true);

      $faqHeading.attr("aria-expanded", false);

      $faqHeading.off("click activate").on("click activate", function () {
        const $currentAccordion = $(this).parent();
        const $currentAccordionContent = $currentAccordion.next();

        // Close all other accordions
        $(".faq-accordion-item").not($currentAccordion).removeClass("active");
        $(".faq-accordion-item dd").not($currentAccordionContent).slideUp();
        $(".faq-accordion-item dt button")
          .not($(this))
          .attr("aria-expanded", false);

        // Toggle current accordion
        if (!$currentAccordion.hasClass("active")) {
          // Close any open accordion items
          $(
            ".faq-accordion > .faq-accordion-items > .faq-accordion-item > dt"
          ).removeClass("active");
          $(
            ".faq-accordion > .faq-accordion-items > .faq-accordion-item > .panel"
          ).slideUp();

          // Open the clicked accordion item
          $currentAccordion.addClass("active");
          $currentAccordionContent.slideDown();
        } else {
          // Close the clicked accordion item
          $currentAccordion.removeClass("active");
          $currentAccordionContent.slideUp();
        }
        // $currentAccordion.toggleClass("active");
        // $currentAccordionContent.slideToggle(() => {
        //   const faqIcons = $(this).find(".icon");
        //   if (faqIcons.hasClass("icon--active")) {
        //     faqIcons.toggleClass("icon--active");
        //   }
        // });

        const state = $currentAccordion.hasClass("active");
        $(this).attr("aria-expanded", state);
        $currentAccordionContent.attr("aria-hidden", !state);
        return false;
      });

      $faqHeading.on("keydown", function (event) {
        const keyCode = event.keyCode || event.which;
        if (keyCode === 13) {
          $(this).trigger("activate");
        }
      });
    },
    unload() {
      $(".faq-accordion > dt > button").off("click activate");
      $(".faq-accordion > dt > button").off("keydown");
    },
  };


})();
