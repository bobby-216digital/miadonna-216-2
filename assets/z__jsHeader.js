/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
    window.PXUTheme.mobileMenu.init();
  window.PXUTheme.jsHeader = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsHeader = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      // Selectors
      this.$el = $("#header");
      // this.$el2 = $("#mobile-header");
      this.$menuToggle = this.$el.find(".header__menu-toggle");
      // let desktopHeaderHeight = this.$el.height();
      // let mobileHeaderHeight = this.$el2.height();
      let announcementHeight = $(".announcement-sticky-wrapper").height();

      // $("body").css('--desktop-header-height', `${desktopHeaderHeight}px`);
      // $("body").css('--mobile-header-height', `${mobileHeaderHeight}px`);

      this.$el.find(".header__logo img").attr("loading", "eager");
      $section.find(".mobile-logo img").attr("loading", "eager");

      // Overlaid header
      if (this.enable_overlay === true && isScreenSizeLarge()) {
        this.updateOverlayStyle(this.sectionUnderlayIsImage());
      }
      window.PXUTheme.jsHeader.updatePanelWidth($(this));

      // Sticky header
      if (this.enable_sticky === true && isScreenSizeLarge()) {
        this.enableSticky(announcementHeight);

        $(window).on("resize", () => {
          this.enableSticky(announcementHeight);
           window.PXUTheme.jsHeader.updatePanelWidth($(this));
        });
      }
      $(window).on("resize", () => {
           window.PXUTheme.jsHeader.updatePanelWidth($(this));
        });

      if (
        this.header_layout == "centered" ||
        this.header_layout == "search_focus"
      ) {
        this.$menuToggle.on("click", () => {
          this.showStickyMenu();
        });
      } else if (this.header_layout == "vertical") {
        $section.find(".header-sticky-wrapper").stick_in_parent();
        if (window.PXUTheme.theme_settings.announcement_enabled == true) {
          window.PXUTheme.jsAnnouncementBar.addVerticalHeaderTopMargin();
        }
        this.addOffScreenDropdownCheck();
      }

      if ($(".mega-menu").length > 0) {
        window.PXUTheme.jsMegaMenu.init($section);
      }

      if (!isScreenSizeLarge() || $(window).width() <= 1024) {
        this.unload();
        window.PXUTheme.mobileMenu.init();
      }

      $(".search-overlay__close").on("click", function () {
        window.PXUTheme.jsHeader.hideSearch();
      });

      $(document).on("click", "[data-show-search-trigger]", function () {
        window.PXUTheme.jsHeader.showSearch();
      });

      if (
        isScreenSizeLarge() ||
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        $(
          ".dropdown-click--true .header__link:not(.primary-brand, .primary-logo)"
        ).on("click touchstart", function (e) {
          var $this = $(this);
          window.PXUTheme.jsHeader.toggleMenuClick(e, $this);
        });
      }
       $(document).on("click", "#tab-exclusive", function (e) {
         
           var panels = document.querySelectorAll('.mmexclusive-panel');

    panels.forEach(function(panel) {
       if (window.innerWidth <= 1024) {
            
        panel.style.removeProperty('width');
          }else{
            panel.style.removeProperty('width');
          
         

        var rightpanel = panel.querySelector('.mmright-panel');

        var currentHeight = panel.clientHeight;
        
        var rightcurrentHeight = rightpanel ? rightpanel.clientHeight : 0;

        if (rightcurrentHeight === 0) {
          if(currentHeight == 0){
             rightcurrentHeight = currentHeight;
           }else{
            rightcurrentHeight = currentHeight;
            }
        }
        
        var newWidth = (rightcurrentHeight * 730) / 965;

        panel.style.width = newWidth + "px";
        }
    });
        });
        $(document).on("click", ".video-control-btn-menu", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $button = $(this);
    var $wrapper = $button.closest(".video-element");
    var $videos = $wrapper.find("video");
    console.log($wrapper);

    const paused = $button.attr("aria-pressed") === "true";

    $button.toggleClass("is-paused", !paused);

    if (paused) {
        $videos.each(function () {
            this.play().catch(() => {});
        });

        $button.attr({
            "aria-pressed": "false",
            "aria-label": "Pause background video"
        });
    } else {
        $videos.each(function () {
            this.pause();
        });

        $button.attr({
            "aria-pressed": "true",
            "aria-label": "Play background video"
        });
    }
});
      if (this.dropdown_click === false) {
        $(".navbar-item").on("mouseleave", function () {
          window.PXUTheme.jsHeader.collapseSubmenu($(this));
        });
      }

      $(document).on("keydown", "[data-show-search-trigger]", function (e) {
        if (e.which === 13) {
          window.PXUTheme.jsHeader.showSearch();
        }
      });
    },
    toggleMenuClick: function (e, $this) {
      var $parentWrap = $this.parents(".has-dropdown, .has-mega-menu");

      if (!$parentWrap.hasClass("is-opened") && $parentWrap.length > 0) {
        // Prevent link on first click
        e.preventDefault();

        // Close all dropdowns & mega menu
        $(".has-dropdown, .has-mega-menu").removeClass("is-opened");
        $(".mega-menu__section").removeClass("is-active");

        // Open selected dropdown/mega menu
        $parentWrap.addClass("is-opened");
        $parentWrap.data("clicked", "true");
      } else {
        // Close all dropdowns & mega menu
        $(".has-dropdown, .has-mega-menu").removeClass("is-opened");
        $(".mega-menu__section").removeClass("is-active");
      }

      // Close dropdown if click anywhere outside dropdown menu
      $(window).on("click", function (e) {
        if (
          $(e.target).closest(".header__link, .navbar-dropdown").length === 0
        ) {
          $(".has-dropdown, .has-mega-menu").removeClass("is-opened");
          $(".mega-menu__section").removeClass("is-active");
          window.PXUTheme.jsHeader.collapseSubmenu($(".navbar-item"));
        }
      });
    },
    collapseSubmenu: function (el) {
      $(el).find(".has-submenu input").prop("checked", false);
    },
     updatePanelWidth: function (el) {
      var panels = document.querySelectorAll('.mmexclusive-panel');

    panels.forEach(function(panel) {
       
       if (window.innerWidth <= 1024) {
          panel.style.removeProperty('width');
       }else{

        var rightpanel = panel.querySelector('.mmright-panel');

        var currentHeight = panel.clientHeight;
        
        var rightcurrentHeight = rightpanel ? rightpanel.clientHeight : 0;

        if (rightcurrentHeight === 0) {
          if(currentHeight == 0){
                rightcurrentHeight = currentHeight;
           }else{
            rightcurrentHeight = currentHeight;
            }
        }
        
        var newWidth = (rightcurrentHeight * 730) / 965;

        panel.style.width = newWidth + "px";
        }
    });
    },
    showStickyMenu: function () {
      this.$menuToggle.toggleClass("is-active");
      this.$el.find(".sticky-menu-wrapper").toggleClass("is-visible");
    },
    hideStickyMenu: function () {
      this.$menuToggle.removeClass("is-active");
      this.$el.find(".sticky-menu-wrapper").removeClass("is-visible");
    },
    disableSticky: function () {
      let $stickyEl = $("#header");

      $stickyEl.unstick();
      $stickyEl.removeClass("sticky--enabled");

      setTimeout(function () {
        $stickyEl.css("height", "auto");
      }, 250);
    },
    enableSticky: function (offset) {
      let $stickyEl = this.$el;

      $stickyEl.addClass("sticky--enabled");

      $stickyEl
        .sticky({
          wrapperClassName: "header-sticky-wrapper",
          zIndex: 40,
          topSpacing: offset || 0,
        })
        .on("sticky-start", () => {
          let headerHeight;
          let announcementHeight;

          // Hide the mini cart for centered header layout
          if (window.PXUTheme.theme_settings.header_layout == "centered") {
            $(
              ".top-bar [data-ajax-cart-trigger] [data-ajax-cart-mini_cart]"
            ).css("display", "none");
          }

          // Get header height is sticky enabled
          if (
            window.PXUTheme.jsHeader.enable_sticky == true &&
            window.PXUTheme.theme_settings.header_layout != "vertical"
          ) {
            headerHeight = window.PXUTheme.jsHeader.getHeaderHeight();
          }

          // Get announcement height is sticky enabled
          if (
            typeof window.PXUTheme.jsAnnouncementBar !== "undefined" &&
            window.PXUTheme.jsAnnouncementBar.enable_sticky == true &&
            window.PXUTheme.theme_settings.header_layout != "vertical"
          ) {
            announcementHeight =
              window.PXUTheme.jsAnnouncementBar.getAnnouncementHeight();
          } else {
            announcementHeight = 0;
          }

          let totalHeight = headerHeight + announcementHeight;
          $stickyEl
            .parent()
            .parent()
            .find(".search-overlay")
            .addClass("sticky-search")
            .css("top", totalHeight + "px");

          if (
            this.enable_overlay === true &&
            this.sectionUnderlayIsImage() === true
          ) {
            $stickyEl.parent().addClass("has-overlaid-header");
            this.disableOverlayStyle();
          } else if (this.enable_overlay === true) {
            this.disableOverlayStyle();
          }
        })
        .on("sticky-end", () => {
          $stickyEl
            .parent()
            .parent()
            .find(".search-overlay")
            .removeClass("sticky-search")
            .css("top", "100%");

          // Safety timeout for logo width transition which can throw calculated height off
          setTimeout(() => {
            $stickyEl.sticky("update");
          }, 250);

          // Un-hide the mini cart when scrolled back to the top
          if (window.PXUTheme.theme_settings.header_layout == "centered") {
            $(
              ".top-bar [data-ajax-cart-trigger] [data-ajax-cart-mini_cart]"
            ).css("display", "block");
          }

          this.$el.find(".sticky-menu-wrapper").removeClass("is-visible");
          this.$menuToggle.removeClass("is-active");

          if (
            this.enable_overlay === true &&
            this.sectionUnderlayIsImage() === true
          ) {
            this.updateOverlayStyle(this.sectionUnderlayIsImage());
          }
        });
    },
    disableOverlayStyle: function () {
      $("[data-enable_overlay]").attr("data-enable_overlay", false);
    },
    enableOverlayStyle: function () {
      $("[data-enable_overlay]").attr("data-enable_overlay", true);
    },
    updateOverlayStyle: function (overlayBoolean) {
      $("[data-enable_overlay]").attr("data-enable_overlay", overlayBoolean);
    },
    sectionUnderlayIsImage: function () {
      let $firstSection = $("[data-check-for-order=true]")
        .find("[id^=shopify-section]")
        .first();

      // Check whether the first element has class to indicate it should be under header when overlay is enabled
      if (
        $firstSection.hasClass("overlaid-header-option") &&
        $.trim($firstSection.html()).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    showSearch: function () {
      $("[data-show-search-trigger]").addClass("is-active");
      if (window.PXUTheme.theme_settings.search_layout == "overlay") {
        $("html").css("overflow", "hidden");
        $("body").css("overflow", "hidden");
        $(
          '[data-search-type="' +
            window.PXUTheme.theme_settings.search_layout +
            '"]'
        ).toggleClass("is-opened");
        setTimeout(function () {
          $('.search-form .search__fields input[type="text"]').focus();
        }, 100);
      } else {
        $.fancybox.open($(".js-search-popup"), {
          baseClass: "search__lightbox",
          hash: false,
          infobar: false,
          toolbar: false,
          loop: true,
          smallBtn: true,
          mobile: {
            preventCaptionOverlap: false,
            toolbar: false,
          },
          beforeClose: function () {
            $("[data-show-search-trigger]").removeClass("is-active");
          },
        });
      }
    },
    hideSearch: function () {
      $("[data-show-search-trigger]").removeClass("is-active");
      if (window.PXUTheme.theme_settings.search_layout == "overlay") {
        $("html").css("overflow", "");
        $("body").css("overflow", "");
        $(
          '[data-search-type="' +
            window.PXUTheme.theme_settings.search_layout +
            '"]'
        ).removeClass("is-opened");
        $('.search-form .search__fields input[type="text"]').blur();
      } else {
        $.fancybox.close(
          $(
            '[data-search-type="' +
              window.PXUTheme.theme_settings.search_layout +
              '"]'
          )
        );
      }
    },
    addOffScreenDropdownCheck: function () {
      $(".navbar-item.has-dropdown--vertical").hover(function () {
        const dropdown = $(this),
          menu = dropdown.find(".navbar-dropdown");

        menu.removeClass("navbar-dropdown--fix-offscreen");

        if (menu.is(":off-screen")) {
          menu.addClass("navbar-dropdown--fix-offscreen");
        }
      });
    },
    getHeaderHeight: function () {
      const headerHeight = $(".header-section").outerHeight() || 0;

      return headerHeight;
    },
    unload: function ($section) {
      $(".has-overlaid-header").removeClass("has-overlaid-header");
      $("[data-show-search-trigger]").off();
      $(".navbar-item").off();
      $("#header").off();
      $(".dropdown-click--true .header__link").off();
      this.$menuToggle.off();
      this.disableSticky();
      this.disableOverlayStyle();
    },
  };

  /******/
})();
